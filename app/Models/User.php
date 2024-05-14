<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use PDO;
use App\Models\PettyCashBox;
use Faker\Provider\ar_EG\Person;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'ci',
        'password',
        'role_id',
        'photo_profile',
        'date_of_birth',
        'is_active',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
        'is_active' => 'boolean',
    ];

    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    public function surveys()
    {
        return $this->hasMany(Survey::class);
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

    public function pettyCashBox(){
        return $this->hasOne(PettyCashBox::class);
    }
    
}
