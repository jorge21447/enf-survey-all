<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Certificate;
use Illuminate\Http\Request;

class CertificateController extends Controller
{
    


    public function getCertificateUser(string $id){

        $user = User::find($id);

        // Verificar si la encuesta existe
        if (!$user) {
            // Si la encuesta no existe, puedes retornar un mensaje de error o lanzar una excepción
            return response()->json(['message' => 'Usuario no existente'], 404);
        }
        try {
            // ID del usuario
            $userId = $user->id; // Aquí debes especificar el ID del usuario que deseas buscar
        
            // Buscar todos los certificados del usuario
            $certificates = Certificate::with('survey')->where('user_id', $userId)->get();
        
            // Retornar los certificados encontrados
            return response()->json(['certificates' => $certificates], 200);
        } catch (\Exception $e) {
            // Manejar cualquier excepción que pueda ocurrir
            return response()->json(['error' => 'Ocurrió un error al buscar los certificados del usuario.'], 500);
        }
    }

    
    
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $certificate = Certificate::find($id);

        // Verificar si la encuesta existe
        if (!$certificate) {
            // Si la encuesta no existe, puedes retornar un mensaje de error o lanzar una excepción
            return response()->json(['message' => 'Certificado no existente'], 404);
        }
        return response([
            'certificate' => $certificate
        ], 200);

    }

}
