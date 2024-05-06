<?php

namespace App\Http\Controllers;

use App\Models\Refill;
use Illuminate\Http\Request;

class RefillController extends Controller
{

    // Obtener todas las recargas
    public function getAllRefills()
    {
        $refills = Refill::all();
        return response()->json($refills);
    }

    // Obtener todas las recargas de una caja chica específica
    public function getAllRefillsByPettyCashBox($id)
    {
        $refills = Refill::where('petty_cash_box_id', $id)->get();
        return response()->json($refills);
    }

    // Obtener una recarga específica
    public function showRefill($id)
    {
        $refill = Refill::find($id);
        if (!$refill) {
            return response()->json(['message' => 'Recarga no encontrada'], 404);
        }
        return response()->json($refill);
    }

    // Crear una nueva recarga
    public function createRefill(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'refillDate' => 'required|date',
            'source' => 'nullable|string',
            'petty_cash_box_id' => 'required|exists:petty_cash_boxes,id',
        ]);

        $refill = Refill::create($request->all());

        return response()->json($refill, 201);
    }


    // Editar una recarga existente
    public function editRefill(Request $request, $id)
    {
        $refill = Refill::find($id);
        if (!$refill) {
            return response()->json(['message' => 'Recarga no encontrada'], 404);
        }

        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
            'refillDate' => 'required|date',
            'source' => 'nullable|string',
        ]);

        $refill->update($request->all());
        $refill->save();

        return response()->json($refill, 200);
    }

    // Eliminar una recarga existente
    public function deleteRefill($id)
    {
        $refill = Refill::find($id);
        if (!$refill) {
            return response()->json(['message' => 'Recarga no encontrada'], 404);
        }

        $refill->delete();
        return  response()->json(['message' => 'Recarga eliminada'], 200);
    }
}
