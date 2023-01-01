<?php

namespace App\Models;

use App\Casts\Password;
use App\Contracts\CanComment as CanCommentContract;
use App\Traits\CanComment;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

/**
 * @mixin IdeHelperAdministrator
 */
class Administrator extends Authenticatable implements JWTSubject, CanCommentContract
{
    use HasFactory;
    use HasUuids;
    use Notifiable;
    use CanComment;

    protected $fillable = [
        'email',
        'password',
    ];

    protected $casts = [
        'password' => Password::class,
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [
            'data' => [
                'email' => $this->email,
            ],
        ];
    }

    public function getFullName(): string
    {
        return $this->email;
    }
}
