<?php

namespace App\Traits;

use App\Contracts\Commentable;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Model
 */
trait CanComment
{
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'senderable');
    }

    public function commentTo(Commentable $commentable, string $message): Comment
    {
        return $this->comments()->create([
            'commentable_id' => $commentable->getKey(),
            'commentable_type' => get_class($commentable),
            'message' => $message,
        ]);
    }
}
