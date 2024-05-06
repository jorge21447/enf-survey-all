<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'category',
        'expenseDate',
        'description',
        'petty_cash_box_id'
    ];

    public function pettyCashBox()
    {
        return $this->belongsTo(PettyCashBox::class);
    }
}
