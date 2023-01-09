<?php

namespace App\Models;

use Avidianity\LaravelExtras\Casts\FloatCast;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperRating
 */
class Rating extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'value',
        'client_id',
    ];

    protected $casts = [
        'value' => FloatCast::class,
    ];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function rateable(): MorphTo
    {
        return $this->morphTo();
    }
}
