<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'description',
        'creation_date',
        'finish_date',
        'style_survey',
        'typeSurvey',
        'has_certificate',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sections()
    {
        return $this->hasMany(Section::class);
    }

    public function categories()
    {
        return $this->belongsToMany(Category::class);
    }

    public function assignments()
    {
        return $this->hasMany(SurveyAssignment::class);
    }
    
    public function responses()
    {
        return $this->hasMany(SurveyResponse::class);
    }

    public function certificates()
    {
        return $this->hasMany(Certificate::class);
    }
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }
}
