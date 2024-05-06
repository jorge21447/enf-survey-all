<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use Illuminate\Http\Request;

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
            return response()->json(['message' => 'Expense not found'], 404);
        }
        return response()->json($expense);
    }

    public function createExpense(Request $request)
    {
        $request->validate([
            'amount' => 'required|numeric',
            'category' => 'required|string',
            'expenseDate' => 'required|date',
            'description' => 'required|string'
        ]);

        $expense = new Expense([
            'amount' => $request->input('amount'),
            'category' => $request->input('category'),
            'expenseDate' => $request->input('expenseDate'),
            'description' => $request->input('description')
        ]);

        $expense->save();

        return response()->json($expense, 201);
    }

    public function editExpense(Request $request, $id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }

        $request->validate([
            'amount' => 'numeric',
            'category' => 'string',
            'expenseDate' => 'date',
            'description' => 'string'
        ]);

        $expense->fill($request->all());
        $expense->save();

        return response()->json($expense, 200);
    }

    public function deleteExpense($id)
    {
        $expense = Expense::find($id);
        if (!$expense) {
            return response()->json(['message' => 'Expense not found'], 404);
        }
        
        $expense->delete();
        return response()->json(null, 204);
    }
}
