<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Traits\HasComments;
use App\Traits\HasRatings;
use Avidianity\LaravelExtras\Casts\FloatCast;
use Avidianity\LaravelExtras\Casts\JsonCast;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Laravel\Scout\Searchable;

/**
 * @mixin IdeHelperPond
 */
class Pond extends Model implements Commentable
{
    use HasFactory;
    use HasUuids;
    use HasComments;
    use HasRatings;
    use Searchable;

    protected $fillable = [
        'owner_id',
        'name',
        'status',
        'image_url',
        'description',
        'images',
        'latitude',
        'longitude',
    ];

    protected $casts = [
        'images' => JsonCast::class,
        'latitude' => FloatCast::class,
        'longitude' => FloatCast::class,
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(Owner::class);
    }

    public function toSearchableArray()
    {
        return [
            'name' => $this->name,
        ];
    }
}
