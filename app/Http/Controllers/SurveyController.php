<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Option;
use App\Models\Survey;
use App\Models\Section;
use App\Models\Question;
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
        return "Hello world";
    }

    public function surveyAll()
    {
        $user = Auth::user();
        if ($user->role_id == '1') {
            $survey = Survey::with('sections.questions.options', 'user', 'responses')->orderBy('creation_date', 'desc')->get();
            return response()->json($survey);
        }

        //Poner logica de usuarios aqui 
        $survey = Survey::with('sections.questions.options', 'user', 'responses')->orderBy('creation_date', 'desc')->get();
        return response()->json($survey);


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
                'finish_date' => isset($data['finish_date']) ? Carbon::parse($data['finish_date']) : null,
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
}
