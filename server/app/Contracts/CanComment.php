<?php

namespace App\Contracts;

use App\Models\Comment;

/**
 * @mixin \Illuminate\Database\Eloquent\Model
 */
interface CanComment
{
    public function getFullName(): string;
    public function commentTo(Commentable $commentable, string $message): Comment;
}
