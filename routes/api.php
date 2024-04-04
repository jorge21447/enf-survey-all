<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\SurveyController;
use App\Http\Controllers\SurveyResponseController;
use App\Http\Controllers\UserController;
use App\Models\SurveyResponse;

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
        return User::with('role')->find($request->user()->id);
    });

    // Cerrar Sesion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Usuarios
    Route::controller(UserController::class)->group(function () {
        Route::get('/users', 'index');
        Route::get('/users/{id}', 'show');
        Route::post('/users', 'store');
        Route::put('/users/{id}', 'update');
        Route::delete('/users/{id}', 'destroy');
    });

    // Encuestas
    Route::controller(SurveyController::class)->group(function () {
        Route::get('/surveys', 'index');
        Route::get('/surveys/admin/', 'surveyAll');
        Route::post('/surveys/new', 'store');
        Route::get('/surveys/{id}', 'show');
        Route::get('/surveys/fill/{id}', 'getSurveyFill');
        Route::post('/surveys/edit/{id}', 'update');
        Route::delete('/surveys/{id}', 'destroy');
    });

    // Resputas
    Route::controller(SurveyResponseController::class)->group(function () {
        Route::post('/responses/new', 'create');
    });


    // Certificados
    Route::controller(CertificateController::class)->group(function () {
        Route::get('/certificates/user/{id}', 'getCertificateUser');
        Route::get('/certificates/{id}', 'show');
    });


});

Route::controller(AuthController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
});

Route::controller(SurveyController::class)->group(function () {
    Route::get('/surveys', 'index');
});



// 
