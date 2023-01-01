<?php

namespace App\Models;

use App\Casts\Password;
use App\Contracts\CanComment as CanCommentContract;
use App\Traits\CanComment;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

/**
 * @mixin IdeHelperClient
 */
class Client extends Authenticatable implements JWTSubject, MustVerifyEmail, CanCommentContract
{
    use HasFactory;
    use HasUuids;
    use Notifiable;
    use CanComment;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'email_verified_at',
    ];

    protected $casts = [
        'password' => Password::class,
    ];

    protected $dates = [
        'email_verified_at',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'data' => [
                'first_name' => $this->first_name,
                'last_name' => $this->last_name,
                'email' => $this->email,
            ],
        ];
    }

    public function getFullName(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }

    public function issues(): HasMany
    {
        return $this->hasMany(Issue::class);
    }
}
