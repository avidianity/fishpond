<?php

namespace App\Traits;

use App\Contracts\Commentable;
use App\Models\Comment;

/**
 * @method \Illuminate\Database\Eloquent\Relations\MorphMany comments()
 */
trait CanComment
{
    public function commentTo(Commentable $commentable, string $message): Comment
    {
        return $this->comments()->create([
            'commentable_id' => $commentable->getKey(),
            'commentable_type' => get_class($commentable),
            'message' => $message,
        ]);
    }
}
