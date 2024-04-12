<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Option;
use App\Models\Survey;
use App\Models\Section;
use App\Models\Question;
use App\Models\SurveyAssignment;
use Illuminate\Http\Request;
use App\Models\SurveyResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SurveyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    public function surveyCertificatesAll()
    {
        $user = Auth::user();
        if ($user->role_id == '1' || $user->role_id == '2') {
            $survey = Survey::with('sections.questions.options', 'user', 'responses')
                ->where('has_certificate', '1')
                ->orderBy('creation_date', 'desc')->get();
            return response()->json($survey);
        }
        return response()->json(['error' => 'No tienes permiso para acceder a esta información'], 403);
    }

    public function surveyAll()
    {
        $user = Auth::user();
        if ($user->role_id == '1' || $user->role_id == '2') {
            $survey = Survey::with('sections.questions.options', 'user', 'responses')->orderBy('creation_date', 'desc')->get();
            return response()->json($survey);
        }
        if ($user->role_id == '3' || $user->role_id == '4') {
            // Si el usuario es administrador (role_id = 1) o docente (role_id = 3)
            $openSurveys = Survey::with('sections.questions.options', 'user', 'responses')
                ->where('typeSurvey', 'open')
                ->orderBy('creation_date', 'desc')
                ->get();

            $closedSurveys = Survey::with('sections.questions.options', 'user', 'responses')
                ->where('typeSurvey', 'closed')
                ->whereHas('assignments', function ($query) use ($user) {
                    $query->where('role_id', $user->role_id);
                })
                ->orderBy('creation_date', 'desc')
                ->get();

            $surveys = $openSurveys->merge($closedSurveys);
            return response()->json($surveys);
        }

        return response()->json(['error' => 'No tienes permiso para acceder a esta información'], 403);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $user = Auth::user();

            $data = $request->all();

            // Paso 1: Crear la encuesta
            $survey = Survey::create([
                'user_id' => $user->id,
                'title' => $data['title'],
                'description' => $data['description'] ?? null,
                'creation_date' => Carbon::now(),
                'finish_date' => isset($data['finish_date']) ? $data['finish_date'] : null,
                'style_survey' => $data['style_survey'] ?? null,
                'typeSurvey' => $data['typeSurvey'],
                'has_certificate' => $data['has_certificate'],
            ]);

            $section = Section::create([
                'survey_id' => $survey->id,
                'section_title' => $data['title'],
                'section_description' => $data['description'] ?? null,
                'section_number' => 1
            ]);


            // Paso 2: Crear las preguntas
            foreach ($data['questions'] as  $key  => $questionData) {
                $question = Question::create([
                    'section_id' => $section->id,
                    'questionTitle' => $questionData['questionTitle'],
                    'questionDescription' => $questionData['questionDescription'] ?? null,
                    'questionType' => $questionData['type'],
                    'questionRequiere' => $questionData['require'] ? 1 : 0,
                    'questionNumber' => $key
                ]);
                // Paso 3: Crear opciones de pregunta si las hay
                if (in_array($questionData['type'], ['radio', 'checkbox', 'rating', 'boolean']) && !empty($questionData['options'])) {
                    foreach ($questionData['options'] as $optionText) {
                        Option::create([
                            'question_id' => $question->id,
                            'optionText' => $optionText,
                            'optionType' => $question->questionType
                        ]);
                    }
                }
            }

            // Si la encuesta es de tipo 'closed', asignar roles automáticamente
            if ($survey->typeSurvey === 'closed' && $request->filled('assigned_roles')) {
                $roleId = $request->assigned_roles;

                SurveyAssignment::create([
                    'survey_id' => $survey->id,
                    'role_id' => $roleId,
                    'assigned_at' => Carbon::now(),
                ]);
            }


            DB::commit();
            return response([
                'message' => ['Encuesta creada correctamente']
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            //Obtener el error
            // return response(['errors' => ['Ocurrio algo inesperado con el servidor', $e->getMessage()]], 422);
            return response([
                'errors' => ['Ocurrio algo inesperado con el servidor']
            ], 422);
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $surveyb = Survey::find($id);
        if (!$surveyb) {
            return response([
                'message' => ['Encuesta no encontrada']
            ], 404);
        }
        //$survey = Survey::with('sections.questions.options')->find($id);
        $survey = Survey::with([
            'sections.questions.options', // Incluir también las opciones
            'sections.questions' => function ($query) {
                $query->orderBy('questionNumber', 'asc'); // Ordenar solo las preguntas
            },
        ])->find($id);

        $surveyData = [
            'id' => $survey->id,
            'user_id' => $survey->user_id,
            'title' => $survey->title,
            'description' => $survey->description,
            'typeSurvey' => $survey->typeSurvey,
            'finish_date' => $survey->finish_date,
            'style_survey' => $survey->style_survey,
            'has_certificate' => $survey->has_certificate,
            'questions' => [],
            'assigned_roles' => $survey->typeSurvey === 'closed' ? $survey->assignments->pluck('name') : null, // Agregar roles asignados solo si la encuesta es de tipo "closed"
            'comments' => $survey->comments->pluck('content')->toArray(),
        ];

        foreach ($survey->sections as $section) {
            foreach ($section->questions as $question) {
                $questionData = [
                    'id' => $question->id,
                    'questionTitle' => $question->questionTitle,
                    'withDescription' => false,
                    'type' => $question->questionType,
                    'options' => $question->options->pluck('optionText')->toArray(),
                    'respondents' => [],
                    'open' => false,
                    'require' => $question->questionRequiere,
                    'options' => [],
                ];

                $responses = SurveyResponse::where('question_id', $question->id)->get();

                // Agregar las respuestas al array de respondents
                foreach ($responses as $response) {
                    $user = User::find($response->user_id); // Obtener el usuario correspondiente
                    $user_name = $user ? $user->name : 'Usuario desconocido'; // Obtener el nombre del usuario si existe

                    $questionData['respondents'][] = [
                        'user_id' => $response->user_id,
                        'user_name' => $user_name,
                        'response' => $response->response,
                        'createdAt' => $response->created_at,
                    ];
                }

                foreach ($question->options as $option) {
                    $questionData['options'][] = $option->optionText;
                }

                $surveyData['questions'][] = $questionData;
            }
        }

        return response([

            $surveyData
        ], 200);
    }


    public function getSurveyFill(string $id)
    {
        $surveyb = Survey::find($id);
        if (!$surveyb) {
            return response([
                'message' => ['Encuesta no encontrada']
            ], 404);
        }
        //$survey = Survey::with('sections.questions.options')->find($id);
        $survey = Survey::with([
            'sections.questions.options', // Incluir también las opciones
            'sections.questions' => function ($query) {
                $query->orderBy('questionNumber', 'asc'); // Ordenar solo las preguntas
            },
        ])->find($id);

        $surveyData = [
            'id' => $survey->id,
            'user_id' => $survey->user_id,
            'title' => $survey->title,
            'description' => $survey->description,
            'typeSurvey' => $survey->typeSurvey,
            'finish_date' => $survey->finish_date,
            'style_survey' => $survey->style_survey,
            'has_certificate' => $survey->has_certificate,
            'questions' => [],
            'assigned_roles' => $survey->typeSurvey === 'closed' ? $survey->assignments->pluck('role_id') : null // Agregar roles asignados solo si la encuesta es de tipo "closed"
        ];

        foreach ($survey->sections as $section) {
            foreach ($section->questions as $question) {
                $questionData = [
                    'id' => $question->id,
                    'questionTitle' => $question->questionTitle,
                    'withDescription' => false,
                    'type' => $question->questionType,
                    'options' => $question->options->pluck('optionText')->toArray(),
                    'respondents' => [],
                    'open' => false,
                    'require' => $question->questionRequiere,
                    'options' => [],
                ];


                foreach ($question->options as $option) {
                    $questionData['options'][] = $option->optionText;
                }

                $surveyData['questions'][] = $questionData;
            }
        }

        return response([

            $surveyData
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $survey = Survey::find($id);
        if (!$survey) {
            return response([
                'message' => ['Encuesta no encontrada']
            ], 404);
        }
        try {
            $survey->update([
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'finish_date' => $request->input('finish_date'),
                'style_survey' => $request->input('style_survey'),
                'typeSurvey' => $request->input('typeSurvey'),
            ]);

            $section = Section::where('survey_id', $survey->id)->first();

            foreach ($request->input('questions') as  $key  =>  $questionData) {
                // Buscar la pregunta por su ID si está presente en $questionData
                if (isset($questionData['id'])) {
                    $question = Question::find($questionData['id']);
                } else {
                    $question = null;
                }
                // Si la pregunta no existe, crear una nueva
                if (!$question) {
                    $question = $section->questions()->create([
                        'questionTitle' => $questionData['questionTitle'],
                        'questionDescription' => $questionData['questionDescription'] ?? null,
                        'questionType' => $questionData['type'],
                        'questionRequiere' => $questionData['require'] ? 1 : 0,
                        'questionNumber' => $key
                    ]);
                } else {
                    // Actualizar los datos de la pregunta
                    $question->update([
                        'questionTitle' => $questionData['questionTitle'],
                        'questionDescription' => $questionData['questionDescription'] ?? null,
                        'questionType' => $questionData['type'],
                        'questionRequiere' => $questionData['require'] ? 1 : 0,
                        'questionNumber' => $key
                    ]);
                }

                $question->save();

                // Eliminar las opciones antiguas de la pregunta
                $question->options()->delete();


                if (array_key_exists('options', $questionData)) {
                    // Crear las nuevas opciones de la pregunta
                    foreach ($questionData['options'] as $optionText) {
                        $question->options()->create(['optionText' => $optionText, 'optionType' => $question->questionType]);
                    }
                }
            }
            // Verifica si es una encuesta "closed" y se proporcionó un role_id
            if ($survey->typeSurvey === 'closed' && $request->has('assigned_roles')) {
                $roleId = $request->input('assigned_roles');

                // Actualiza o crea la asignación de rol para la encuesta
                $surveyRole = SurveyAssignment::updateOrCreate(
                    ['survey_id' => $survey->id],
                    ['role_id' => $roleId]
                );

                // Elimina las asignaciones de roles que no coinciden con el role_id proporcionado
                $survey->assignments()->where('role_id', '!=', $roleId)->delete();
            }
            // Obtener las IDs de las preguntas del JSON de datos
            // $questionIds = collect($request->input('questions'))->pluck('id')->toArray();
            // $filteredQuestionIds = array_filter($questionIds, function ($id) {
            //     return $id !== null;
            // });

            // Buscar las preguntas asociadas a la encuesta que no están en la lista de IDs del JSON
            // $section->questions()->whereNotIn('id', $filteredQuestionIds)->delete();

            return response([
                'message' => ['Encuesta actualizada']
            ], 200);
        } catch (\Exception $e) {
            //Obtener el error
            return response(['errors' => ['Ocurrio algo inesperado con el servidor', $e->getMessage()]], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Buscar la encuesta por su ID
        $survey = Survey::find($id);

        // Verificar si la encuesta existe
        if (!$survey) {
            // Si la encuesta no existe, puedes retornar un mensaje de error o lanzar una excepción
            return response()->json(['message' => 'Encuesta no encontrada'], 404);
        }

        // Eliminar la encuesta
        $survey->delete();

        // Retornar una respuesta de éxito
        return response()->json(['message' => 'Encuesta eliminada con éxito']);
    }



    public function checkSurveyResponses(string $id)
    {
        // Obtener el ID de la encuesta del request
        $surveyId = $id;
        // Verificar si la encuesta tiene el typeSurvey como 'closed'
        $survey = Survey::find($surveyId);
        if ($survey && $survey->typeSurvey == 'closed') {
            // Buscar los SurveyAssignment para esta encuesta
            $surveyAssignments = SurveyAssignment::where('survey_id', $surveyId)->get();

            // Inicializar un array para almacenar la información de los usuarios y sus respuestas
            $usersWithResponses = [];

            // Recorrer los SurveyAssignment
            foreach ($surveyAssignments as $assignment) {
                // Obtener el ID del rol asignado
                $roleId = $assignment->role_id;

                // Buscar los usuarios con el rol designado
                $users = User::where('role_id', $roleId)->get();

                // Recorrer los usuarios y verificar si tienen respuestas en la encuesta
                foreach ($users as $user) {
                    // Verificar si el usuario tiene alguna respuesta en la encuesta
                    $hasResponse = SurveyResponse::where('survey_id', $surveyId)
                        ->where('user_id', $user->id)
                        ->exists();

                    // Agregar la información del usuario al array
                    $usersWithResponses[] = [
                        'name' =>  $user->name,
                        'user_id' => $user->id,
                        'role_id' => $roleId,
                        'has_response' => $hasResponse
                    ];
                }
            }

            // Retornar la información de los usuarios con respuestas
            return response()->json($usersWithResponses);
        } elseif ($survey && $survey->typeSurvey == 'open') {
            // En caso de que la encuesta sea 'open', retornar la información de los usuarios sin verificar respuestas
            // Esto se hace asumiendo que no hay restricciones de acceso basadas en roles para encuestas 'open'
            $allUsers = User::all();
            $usersInfo = $allUsers->map(function ($user) use ($surveyId) {
                $hasResponse = SurveyResponse::where('survey_id', $surveyId)
                    ->where('user_id', $user->id)
                    ->exists();
                return [
                    'user_id' => $user->id,
                    'role_id' => $user->role_id,
                    'has_response' => $hasResponse
                ];
            });
            return response()->json($usersInfo);
        } else {
            // Si no se encuentra la encuesta, retornar un mensaje de error
            return response()->json(['error' => 'Encuesta no encontrada'], 404);
        }
    }
}
