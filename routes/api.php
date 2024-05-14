<?php

use App\Models\User;
use App\Models\Refill;
use App\Models\Expense;
use App\Models\PettyCashBox;
use Illuminate\Http\Request;
use App\Models\SurveyResponse;
use App\Models\SurveyAssignment;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ExpenseController;
use App\Http\Controllers\PettyCashBoxController;
use App\Http\Controllers\RefillController;
use App\Http\Controllers\SurveyAssignmentController;
use App\Http\Controllers\SurveyResponseController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/user', function (Request $request) {
        $user = User::with('role')->find($request->user()->id);
        $user->photo_profile = $user->photo_profile? asset($user->photo_profile):'';
        return $user;
    });

    // Cerrar Sesion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Usuarios
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index');
        Route::get('/users/administrative', 'getAdministrativeUsers');
        Route::get('/users/{id}', 'show');
        Route::post('/users', 'store');
        Route::put('/users/{id}', 'update');
        Route::delete('/users/{id}', 'destroy');
        Route::get('/users/certificates/{id}', 'getUsersWithCertificates');
        
    });

    // Encuestas
    Route::controller(SurveyController::class)->group(function () {
        Route::get('/surveys/certificates', 'surveyCertificatesAll');
        Route::get('/surveys/users', 'surveyAll');
        Route::get('/surveys/{id}', 'show');
        Route::get('/surveys/fill/{id}', 'getSurveyFill');
        Route::post('/surveys/new', 'store');
        Route::post('/surveys/edit/{id}', 'update');
        Route::delete('/surveys/{id}', 'destroy');
        
    });

    // Respuestas
    Route::controller(SurveyResponseController::class)->group(function () {
        Route::post('/responses/new', 'create');
    });


    // Certificados
    Route::controller(CertificateController::class)->group(function () {
        Route::get('/certificates/user/{id}', 'getCertificateUser');
        Route::get('/certificates/{id}', 'show');
    });

    //Usuarios Asignaciones

    Route::controller(SurveyAssignmentController::class)->group(function () {
        Route::get('/surveyassignment/{id}', 'show');
    });


    // Caja Chica
    Route::controller(PettyCashBoxController::class)->group(function () {
        Route::get('/pettycashbox/all', 'getAllPettyCashBox');
        Route::get('/pettycashbox/record/{id}', 'getPettyCashBoxRecord');
        Route::get('/pettycashbox/{id}', 'showPettyCashBox');
        Route::get('/pettycashbox/user/{id}', 'showPettyCashBoxUser');
        Route::get('/pettycashbox/expenses/{id}', 'getPettyCashBoxExpenses');
        Route::post('/pettycashbox/new', 'createPettyCashBox');
        Route::put('/pettycashbox/{id}', 'editPettyCashBox');
        Route::delete('/pettycashbox/{id}', 'deletePettyCashBox');
    });

    // Gastos
    Route::controller(ExpenseController::class)->group(function () {
        Route::get('/expenses/all', 'getAllExpenses');
        Route::get('/expenses/{id}/all', 'getAllExpensesByPettyCashBox');
        Route::get('/expenses/{id}', 'showExpense');
        Route::post('/expenses/new/{id}', 'createExpense');
        Route::put('/expenses/{id}', 'editExpense');
        Route::delete('/expenses/{id}', 'deleteExpense');
    });

    // Recargas
    Route::controller(RefillController::class)->group(function () {
        Route::post('/refills/new/{id}', 'createRefill');
        Route::put('/refills/{id}', 'editRefill');
        Route::delete('/refills/{id}', 'deleteRefill');
    });
    
});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::controller(SurveyController::class)->group(function () {
    Route::get('/surveys', 'index');
    Route::get('/surveyresponses/{id}', 'checkSurveyResponses');
});


