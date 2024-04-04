<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $fillable = [
        'survey_id',
        'section_title',
        'section_description',
        'section_number',
    ];

    public function survey()
    {
        return $this->belongsTo(Survey::class);
    }
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
