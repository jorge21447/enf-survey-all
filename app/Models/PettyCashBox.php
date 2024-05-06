<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PettyCashBox extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'balance',
        'user_id'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }

    public function refills()
    {
        return $this->hasMany(Refill::class);
    }
}
