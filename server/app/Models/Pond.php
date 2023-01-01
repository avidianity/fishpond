<?php

namespace App\Models;

use App\Contracts\Commentable;
use App\Traits\HasComments;
use App\Traits\HasRatings;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperPond
 */
class Pond extends Model implements Commentable
{
    use HasFactory;
    use HasUuids;
    use HasComments;
    use HasRatings;

    protected $fillable = [
        'owner_id',
        'name',
        'status',
        'image_url',
        'description',
    ];

    public function owner(): BelongsTo
    {
        return $this->belongsTo(Owner::class);
    }
}
