<?php

namespace App\Http\Controllers;

use App\Models\PettyCashBox;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class PettyCashBoxController extends Controller
{
    public function getAllPettyCashBox()
    {
        // Obtener todas las cajas chicas con la información del usuario responsable cargada
        $pettyCashBoxes = PettyCashBox::with('user')->get();

        // Retornar la respuesta JSON
        return response()->json($pettyCashBoxes);
    }

    public function showPettyCashBox($id)
    {
        $pettyCashBox = PettyCashBox::find($id);
        if (!$pettyCashBox) {
            return response()->json(['message' => ['Caja Chica no encontrada']], 404);
        }
        return response()->json($pettyCashBox);
    }

    public function showPettyCashBoxUser($id)
    {
        $pettyCashBox = PettyCashBox::where('user_id', $id)->first();
        if (!$pettyCashBox) {
            return response()->json(['message' => ['El usuario no tiene una Caja Chica a su cargo']], 404);
        }
        return response()->json($pettyCashBox);
    }

    public function createPettyCashBox(Request $request)
    {
        try {
            DB::beginTransaction();

            // Validar los datos de entrada
            $request->validate([
                'name' => ['required', 'string'],
                'description' => ['required', 'string'],
                'user_id' => ['required', 'exists:users,id'],
                'balance' => ['required', 'numeric', 'gt:0'],
            ], [
                'name.required' => 'El nombre es obligatorio',
                'description.required' => 'La descripción es obligatoria',
                'user_id.required' => 'El usuario responsable es obligatorio',
                'user_id.exists' => 'El usuario no es válido',
                'balance.required' => 'El balance es obligatorio',
                'balance.numeric' => 'El balance no es válido',
                'balance.gt' => 'El balance debe ser mayor que cero',
            ]);

            // Verificar si el usuario ya tiene una caja chica asignada
            $existingPettyCashBox = PettyCashBox::where('user_id', $request->user_id)->first();
            if ($existingPettyCashBox) {
                throw ValidationException::withMessages(['user_id' => ['El usuario ya tiene una caja chica asignada']]);
            }

            // Crear una nueva instancia de PettyCashBox
            $pettyCashBox1 = new PettyCashBox([
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => $request->user_id,
                'balance' => $request->balance,
            ]);

            // Guardar el registro en la base de datos
            $pettyCashBox1->save();

            DB::commit();

            // Devolver una respuesta con el objeto $pettyCashBox y el código 201 
            return response([
                'message' => ['Caja Chica creada correctamente']
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['errors' => ['Ha ocurrido un error al procesar la solicitud']], 500);
        }
    }

    public function editPettyCashBox(Request $request, $id)
    {

        try {
            DB::beginTransaction();

            $pettyCashBox = PettyCashBox::find($id);
            if (!$pettyCashBox) {
                return response()->json(['message' => ['Caja Chica no encontrada']], 404);
            }


            // Validar los datos de entrada
            $request->validate([
                'name' => ['required', 'string'],
                'description' => ['required', 'string'],
                'user_id' => ['required', 'exists:users,id'],
                'balance' => ['required', 'numeric', 'gt:0'],
            ], [
                'name.required' => 'El nombre es obligatorio',
                'description.required' => 'La descripción es obligatoria',
                'user_id.required' => 'El usuario responsable es obligatorio',
                'user_id.exists' => 'El usuario no es válido',
                'balance.required' => 'El balance es obligatorio',
                'balance.numeric' => 'El balance no es válido',
                'balance.gt' => 'El balance debe ser mayor que cero',
            ]);
            // Verificar si el nuevo balance es mayor que el actual
            if ($request->balance <= $pettyCashBox->balance) {
                return response()->json(['errors' => ['El nuevo balance debe ser mayor que el actual']], 422);
            }
            $pettyCashBox->fill($request->all());
            $pettyCashBox->save();

            DB::commit();

            // Devolver una respuesta con el objeto $pettyCashBox y el código 201 
            return response([
                'message' => ['Caja Chica editada correctamente']
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['errors' => ['Ha ocurrido un error al procesar la solicitud']], 500);
        }
    }

    public function getPettyCashBoxExpenses($id)
    {
        $pettyCashBox = PettyCashBox::with('user')->find($id);

        // Verificar si la caja chica no existe
        if (!$pettyCashBox) {
            return response()->json(['message' => ['Caja Chica no encontrada']], 404);
        }

        // Obtener el nombre del encargado de la caja chica
        $manager = $pettyCashBox->user->name;

        // Obtener los gastos asociados a la caja chica
        $expenses = $pettyCashBox->expenses()->get();
        $refills = $pettyCashBox->refills()->get();

        // Calcular el saldo total
        $totalBalance = $pettyCashBox->balance + $expenses->sum('amount');

        // Calcular el total gastado como decimal (8.2)
        $totalSpent = number_format($expenses->sum('amount'), 2);

        // Calcular el saldo disponible como decimal (8.2)
        $availableBalance = number_format(($totalBalance - $totalSpent), 2);

        // Crear el array de datos
        $data = [
            'pettyCashBox' => $pettyCashBox,
            'manager' => $manager,
            'expenses' => $expenses,
            'totalBalance' => number_format($totalBalance, 2),
            'totalSpent' => $totalSpent,
            'availableBalance' => $availableBalance,
        ];
        return response()->json($data);
    }

    public function getPettyCashBoxRecord($id)
    {
        $pettyCashBox = PettyCashBox::find($id);
        if (!$pettyCashBox) {
            return response()->json(['message' => ['Caja Chica no encontrada']], 404);
        }
        // Obtener la suma de los montos de los desembolsos (expenses)
        $totalExpenses = $pettyCashBox->expenses()->sum('amount');

        // Obtener la suma de los montos de los reembolsos (refills)
        $totalRefills = $pettyCashBox->refills()->sum('amount');

        // Calcular el saldo restando los desembolsos de los reembolsos
        $balance = $totalExpenses - $totalRefills + $pettyCashBox->balance;

        // Obtener todas las expenses y refills asociados a la caja chica
        $expenses = $pettyCashBox->expenses()->select('id', 'number', 'amount', 'description', 'expenseDate as date', 'invoiceNumber', DB::raw("'Expense' as type"), 'created_at', 'interested')->get();
        $refills = $pettyCashBox->refills()->select('id', DB::raw("null as number"), 'amount', 'description', 'refill_date as date', DB::raw("null as invoiceNumber"), DB::raw("'Refill' as type"), 'created_at', DB::raw("null as interested"))->get();

        // Combinar las colecciones de expenses y refills sin eliminar duplicados
        $history = $expenses->concat($refills)->sortBy('created_at')->values();

        return response()->json(['history' => $history, 'balance' => $pettyCashBox->balance, 'totalBalance' => $balance]);
    }

    public function deletePettyCashBox($id)
    {
        $pettyCashBox = PettyCashBox::find($id);
        if (!$pettyCashBox) {
            return response()->json(['message' => ['Caja Chica no encontrada']], 404);
        }
        $pettyCashBox->delete();
        return response()->json(['message' => ['Caja Chica eliminada correctamente']]);
    }
}
