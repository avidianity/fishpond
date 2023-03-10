<?php

namespace App\Models;

use App\Casts\Password;
use App\Contracts\CanComment as CanCommentContract;
use App\Traits\CanComment;
use App\Traits\HasOtps;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Scout\Searchable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

/**
 * @mixin IdeHelperOwner
 */
class Owner extends Authenticatable implements JWTSubject, MustVerifyEmail, CanCommentContract
{
    use HasFactory;
    use HasUuids;
    use Notifiable;
    use CanComment;
    use HasOtps;
    use Searchable;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'password',
        'email_verified_at',
        'phone',
        'address',
        'image_url',
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

    public function ponds(): HasMany
    {
        return $this->hasMany(Pond::class);
    }

    public function toSearchableArray()
    {
        return [
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
        ];
    }
}
