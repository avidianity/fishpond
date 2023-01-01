<?php

namespace App\Models;

use App\Contracts\Commentable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperComment
 */
class Comment extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'commentable_id',
        'commentable_type',
        'senderable_id',
        'senderable_type',
        'message',
    ];

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function senderable(): MorphTo
    {
        return $this->morphTo();
    }
}
