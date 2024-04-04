<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Survey;
use App\Models\Question;
use App\Models\Certificate;
use Illuminate\Http\Request;
use App\Models\SurveyResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class SurveyResponseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {

        try {

            DB::beginTransaction();
            // Valida los datos del request
            $validatedData = $request->validate([
                'id' => 'required|integer',
                'user_id' => 'required|integer',
                'questions' => 'required|array',
                'questions.*.id' => 'required|integer',
                'questions.*.respondents' => 'required|array',
                'has_certificate' => 'required|integer'
            ]);

            // Recorre las preguntas y respuestas del JSON y almacena cada respuesta en la tabla survey_responses
            foreach ($validatedData['questions'] as $question) {
                foreach ($question['respondents'] as $respondent) {
                    $surveyResponse = new SurveyResponse();
                    $surveyResponse->survey_id = $validatedData['id'];
                    $surveyResponse->user_id = $respondent['user_id'];
                    $surveyResponse->question_id = $question['id'];
                    $surveyResponse->response = $respondent['response'];
                    $surveyResponse->save();
                }
            }



            if ($validatedData['has_certificate'] == 1) {
                $user = Auth::user();
                $surveyId = $validatedData['id'];
                // Verificar si todas las preguntas de la encuesta han sido respondidas por el usuario
                // $survey = Survey::findOrFail($surveyId);
                // $allQuestionsAnswered = $survey->questions()->whereNotIn('id', SurveyResponse::where('user_id', $user->id)->pluck('question_id'))->count() == 0;

                // Verificar si el usuario ya tiene un certificado para esta encuesta
                $certificateExists = Certificate::where('user_id', $user->id)->where('survey_id', $surveyId)->exists();

                // Si todas las preguntas han sido respondidas y el usuario no tiene un certificado, crear un certificado
                // if ($allQuestionsAnswered && !$certificateExists) {
                if (!$certificateExists) {
                    $certificate = new Certificate();
                    $certificate->user_id = $user->id;
                    $certificate->survey_id = $surveyId;
                    $certificate->save();
                }
            }

            DB::commit();
            return response([
                'message' => ['Respuestas de la encuesta almacenadas correctamente']
            ], 201);
        } catch (\Exception $e) {
            DB::rollback();
            //Obtener el error
            // return response([
            //     'errors' => ['Ocurrio algo inesperado con el servidor']
            // ], 422);
            return response(['errors' => ['Ocurrio algo inesperado con el servidor', $e->getMessage()]], 422);
        }
    }

    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(SurveyResponse $surveyResponse)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SurveyResponse $surveyResponse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SurveyResponse $surveyResponse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SurveyResponse $surveyResponse)
    {
        //
    }
}
