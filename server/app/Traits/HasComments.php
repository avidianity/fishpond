<?php

namespace App\Traits;

use App\Contracts\CanComment as CanCommentContract;
use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Model
 */
trait HasComments
{
    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

    public function commentFrom(CanCommentContract $senderable, string $message): Comment
    {
        return $this->comments()->create([
            'senderable_id' => $senderable->getKey(),
            'senderable_type' => get_class($senderable),
            'message' => $message,
        ]);
    }
}
