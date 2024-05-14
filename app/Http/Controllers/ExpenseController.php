<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Expense;
use App\Models\PettyCashBox;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class ExpenseController extends Controller
{
    public function getAllExpenses()
    {
        $expenses = Expense::all();
        return response()->json($expenses);
    }

    public function getAllExpensesByPettyCashBox($id)
    {
        $expenses = Expense::where('petty_cash_box_id', $id)->get();
        return response()->json($expenses);
    }

    public function showExpense($id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Gasto no encontrado'], 404);
        }
        return response()->json($expense);
    }

    public function createExpense(Request $request, string $id)
    {
        try {
            DB::beginTransaction();

            $pettyCashBox = PettyCashBox::find($id);

            if (!$pettyCashBox) {
                return response()->json(['message' => ['Caja Chica no encontrada']], 422);
            }

            // Validar los datos de entrada
            $data = $request->validate([
                'number' => ['required', 'numeric', 'gt:0', Rule::unique('expenses', 'number')->where(function ($query) use ($id) {
                    $query->where('petty_cash_box_id', $id)
                        ->whereYear('expenseDate', date('Y'));
                })->ignore($id),],
                'invoiceNumber' => ['required', 'string', 'unique:expenses,invoiceNumber,' . $id],
                'amount' => ['required', 'numeric', 'gt:0'],
                'interested' => ['required', 'string'],
                'description' => ['required', 'string'],
            ], [
                'number.required' => 'El número de gasto es obligatorio',
                'number.numeric' => 'El número de gasto no es válido',
                'number.gt' => 'El número de gasto debe ser mayor que cero',
                'number.unique' => 'Ya existe un número de gasto con ese valor',
                'invoiceNumber.required' => 'El número de factura es obligatorio',
                'invoiceNumber.string' => 'El número de factura no es válido',
                'invoiceNumber.unique' => 'Ya existe un número de factura con ese valor',
                'amount.required' => 'El monto es obligatorio',
                'amount.numeric' => 'El monto no es válido',
                'amount.gt' => 'El monto debe ser mayor que cero',
                'interested.required' => 'El nombre es obligatorio',
                'interested.string' => 'El nombre no es válido',
                'description.required' => 'La descripción es obligatoria',
                'description.string' => 'La descripción no es válida',
            ]);

            if ($pettyCashBox->balance < $data['amount']) {
                return response()->json(['errors' => ['El monto del gasto supera el balance de la Caja Chica']], 422);
            }

            $expense = new Expense([
                'petty_cash_box_id' => $id,
                'amount' => $data['amount'],
                'invoiceNumber' => $data['invoiceNumber'] === 'Sin factura' ? null : $data['invoiceNumber'],
                'number' => $data['number'],
                'interested' => $data['interested'],
                'expenseDate' => Carbon::now(),
                'description' => $data['description'],
            ]);

            $pettyCashBox->balance -= $data['amount'];
            $pettyCashBox->save();

            $expense->save();

            DB::commit();

            return response([
                'message' => ['Gasto creado correctamente']
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['errors' => ['Ha ocurrido un error al procesar la solicitud', $e->getMessage()]], 500);
        }
    }

    public function editExpense(Request $request, $id)
    {
        try {
            DB::beginTransaction();

            $expense = Expense::find($id);
            if (!$expense) {
                return response()->json(['errors' => ['Gasto no encontrado']], 404);
            }

            // Validar los datos de entrada
            $data = $request->validate([
                'number' => ['required', 'numeric', 'gt:0', 'unique:expenses,number,' . $id],
                'invoiceNumber' => ['required', 'string', 'unique:expenses,invoiceNumber,' . $id],
                'amount' => ['required', 'numeric', 'gt:0'],
                'interested' => ['required', 'string'],
                'description' => ['required', 'string'],
            ], [
                'number.required' => 'El número de gasto es obligatorio',
                'number.numeric' => 'El número de gasto no es válido',
                'number.gt' => 'El número de gasto debe ser mayor que cero',
                'number.unique' => 'Ya existe un número de gasto con ese valor',
                'invoiceNumber.required' => 'El número de factura es obligatorio',
                'invoiceNumber.string' => 'El número de factura no es válido',
                'invoiceNumber.unique' => 'Ya existe un número de factura con ese valor',
                'amount.required' => 'El monto es obligatorio',
                'amount.numeric' => 'El monto no es válido',
                'amount.gt' => 'El monto debe ser mayor que cero',
                'interested.required' => 'El nombre es obligatorio',
                'interested.string' => 'El nombre no es válido',
                'description.required' => 'La descripción es obligatoria',
                'description.string' => 'La descripción no es válida',
            ]);


            $pettyCashBox = PettyCashBox::find($expense->petty_cash_box_id);
            $pettyCashBox->balance += $expense->amount;
            $pettyCashBox->save();

            if ($pettyCashBox->balance < $data['amount']) {
                return response()->json(['errors' => ['El monto del gasto supera el balance de la Caja Chica']], 422);
            }

            $expense->invoiceNumber = $data['invoiceNumber'] === 'Sin factura' ? null : $data['invoiceNumber'];
            $expense->number = $data['number'];
            $expense->amount = $data['amount'];
            $expense->interested = $data['interested'];
            $expense->description = $data['description'];


            $pettyCashBox->balance -= $data['amount'];
            $pettyCashBox->save();

            $expense->save();

            DB::commit();

            return response([
                'message' => ['Gasto editado correctamente']
            ], 201);
        } catch (ValidationException $e) {
            DB::rollBack();
            return response(['errors' => $e->validator->errors()], 422);
        } catch (\Exception $e) {
            DB::rollBack();
            return response(['errors' => ['Ha ocurrido un error al procesar la solicitud', $e->getMessage()]], 500);
        }
    }

    public function deleteExpense($id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['errors' => ['Gasto no encontrado']], 404);
        }
        $pettyCashBox = PettyCashBox::find($expense->petty_cash_box_id);
        $pettyCashBox->balance += $expense->amount;
        $pettyCashBox->save();

        $expense->delete();

        return response()->json(['message' => 'Gasto eliminado correctamente'], 200);
    }
}
