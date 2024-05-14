<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Refill;
use App\Models\PettyCashBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

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
            return response()->json(['message' => ['Recarga no encontrada']], 404);
        }
        return response()->json($refill);
    }

    // Crear una nueva recarga
    public function createRefill(Request $request, string $id)
    {
        try {
            DB::beginTransaction();

            $request->validate(
                [
                    'amount' => ['required', 'numeric', 'gt:0'],
                    'description' => ['required', 'string'],
                    'source' => ['required', 'string'],
                    'id' => ['required', 'exists:petty_cash_boxes,id'],
                ],
                [
                    'amount.required' => 'El monto de la recarga es obligatorio',
                    'amount.numeric' => 'El monto de la recarga no es válido',
                    'amount.gt' => 'El monto de la recarga debe ser mayor que cero',
                    'description.required' => 'La descripción de la recarga es obligatoria',
                    'description.string' => 'La descripción de la recarga no es válida',
                    'source.required' => 'La fuente de la recarga es obligatoria',
                    'source.string' => 'La fuente de la recarga no es válida',
                    'id.required' => 'La caja chica es obligatoria',
                    'id.exists' => 'La caja chica no existe',
                ]
            );


            $pettyCashBox = PettyCashBox::find($id);
            if (!$pettyCashBox) {
                return response(['message' => ['Caja chica no encontrada']], 404);
            }

            $pettyCashBox->balance += $request->amount;
            $pettyCashBox->save();

            $refill = new Refill(
                [
                    'amount' => $request->amount,
                    'description' => $request->description,
                    'refill_date' => Carbon::now(),
                    'source' => $request->source,
                    'petty_cash_box_id' => $id,
                ]
            );
            $refill->save();
            DB::commit();

            return response(['message' => ['Recarga creada'], 'refill' => $refill], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['errors' => ['Ha ocurrido un error al procesar la solicitud', $e->getMessage()]], 500);
        }
    }


    // Editar una recarga existente
    public function editRefill(Request $request, $id)
    {
        $refill = Refill::find($id);
        if (!$refill) {
            return response()->json(['message' => ['Recarga no encontrada']], 404);
        }

        $request->validate([
            'amount' => 'required|numeric',
            'description' => 'nullable|string',
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
            return response()->json(['message' => ['Recarga no encontrada']], 404);
        }
        $pettyCashBox = $refill->pettyCashBox;
        $pettyCashBox->balance -= $refill->amount;
        $pettyCashBox->save();
        
        $refill->delete();
        return  response()->json(['message' => ['Recarga eliminada']], 200);
    }
}
