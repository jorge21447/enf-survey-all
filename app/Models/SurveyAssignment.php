<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SurveyAssignment extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'user_id',
        'assigned_at',
        'completed_at',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

