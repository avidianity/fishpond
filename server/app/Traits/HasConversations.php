<?php

namespace App\Traits;

use App\Contracts\CanComment as CanCommentContract;
use App\Models\Comment;
use App\Models\Conversation;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Model
 */
trait HasConversations
{
    public function conversations(): MorphMany
    {
        return $this->morphMany(Conversation::class, 'commentable');
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
