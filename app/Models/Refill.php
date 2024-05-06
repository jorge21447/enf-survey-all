<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Refill extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',
        'description',
        'refillDate',
        'source',
        'petty_cash_box_id'
    ];

    public function pettyCashBox()
    {
        return $this->belongsTo(PettyCashBox::class);
    }
}
