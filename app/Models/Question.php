<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = [
        'section_id',
        'questionTitle',
        'questionDescription',
        'questionType',
        'questionRequiere',
        'questionNumber'
    ];

    public function section()
    {
        return $this->belongsTo(Section::class);
    }

    public function options()
    {
        return $this->hasMany(Option::class);
    }

    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }
}
