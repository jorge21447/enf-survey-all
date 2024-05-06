<?php

namespace App\Http\Controllers;

use App\Models\PettyCashBox;
use Illuminate\Http\Request;

class PettyCashBoxController extends Controller
{
    public function getAllPettyCashBox()
    {
        $pettyCashBoxes = PettyCashBox::all();
        return response()->json($pettyCashBoxes);
    }

    public function showPettyCashBox($id)
    {
        $pettyCashBox = PettyCashBox::find($id);
        if (!$pettyCashBox) {
            return response()->json(['message' => 'Caja Chica no encontrada'], 404);
        }
        return response()->json($pettyCashBox);
    }

    public function createPettyCashBox(Request $request)
    {
        $request->validate([
            // Definir reglas de validación según tus requisitos
        ]);

        $pettyCashBox = new PettyCashBox([
            // Asignar valores recibidos del request a los atributos del modelo PettyCashBox
        ]);
        
        $pettyCashBox->save();

        return response()->json($pettyCashBox, 201);
    }

    public function editPettyCashBox(Request $request, $id)
    {
        $pettyCashBox = PettyCashBox::find($id);
        if (!$pettyCashBox) {
            return response()->json(['message' => 'Caja Chica no encontrada'], 404);
        }

        $request->validate([
            // Definir reglas de validación según tus requisitos
        ]);

        $pettyCashBox->fill($request->all());
        $pettyCashBox->save();

        return response()->json($pettyCashBox, 200);
    }

    public function getPettyCashBoxHistory($id)
    {
        $pettyCashBox = PettyCashBox::find($id);
        if (!$pettyCashBox) {
            return response()->json(['message' => 'Caja Chica no encontrada'], 404);
        }
        $history = $pettyCashBox->history(); // Implementa la lógica para obtener el historial
        return response()->json($history);
    }
}
