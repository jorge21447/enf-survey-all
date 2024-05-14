<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\LoginRequest;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\RegisterRequest;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            DB::beginTransaction();
            //Valida el registro
            $data = $request->validated();

            //Autenticar al usuario
            $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'ci' => $data['ci'],
                'password' => bcrypt($data['password']),
                'role_id' => $data['role_id'],
            ]);
            DB::commit();
            $token = $user->createToken('token')->plainTextToken;
            $user2 = User::with('role')->find($user->id);
            $user2->photo_profile = $user->photo_profile ? asset($user->photo_profile) : '';

            return [
                'token' => $token,
                'user' => $user2,
                'message' => ['Usuario registrado exitosamente.']
            ];
        } catch (ValidationException $e) {
            DB::rollBack();
            return response(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['errors' => ['Ha ocurrido un error al procesar la solicitud']], 500);
        }
    }
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        $credentials = $request->only('identifier', 'password');
        if (
            Auth::attempt(['email' => $credentials['identifier'], 'password' => $credentials['password']]) ||
            Auth::attempt(['ci' => $credentials['identifier'], 'password' => $credentials['password']])
        ) {
            //Autenticar al usuario
            $user = Auth::user();
            $user2 = User::with('role')->find($user->id);
            $user2->photo_profile = $user->photo_profile ? asset($user->photo_profile) : '';
            $token = $user->createToken('token')->plainTextToken;


            // Verificar si el usuario tiene una caja chica
            $hasPettyCashBox = $user2->pettyCashBox()->exists();

            // Agregar la información sobre la caja chica dentro del objeto user2
            $user2->hasPettyCashBox = $hasPettyCashBox;

            return [
                'token' => $token,
                'user' => $user2,
            ];
        }
        return response([
            'errors' => ['El correo o la contraseña son incorrectos']
        ], 422);
    }
    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return [
            'user' => null
        ];
    }
}
