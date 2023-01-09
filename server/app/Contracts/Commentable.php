<?php

namespace App\Contracts;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Relations\MorphMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Model
 */
interface Commentable
{
    public function comments(): MorphMany;
    public function commentFrom(CanComment $senderable, string $message): Comment;
}
