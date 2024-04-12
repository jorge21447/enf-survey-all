<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'role_id',
        'assigned_at',
    ];

    // Relación con la tabla de encuestas
    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    // Relación con la tabla de roles
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}

