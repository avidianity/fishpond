<?php

namespace App\Services;

use App\Models\Conversation;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Auth\User;

class ConversationService
{
    protected array $relationships = [];

    /**
     * @param User $user
     * @return Collection<int, Conversation>
     */
    public function all(User $user): Collection
    {
        return $this->query($user)->get();
    }

    public function one(User $user, string $id): Conversation
    {
        return $this->query($user)->findOrFail($id);
    }

    public function make(User $sender, User $receiver): Conversation
    {
        return Conversation::updateOrCreate([
            'sender_id' => $sender->getKey(),
            'sender_type' => get_class($sender),
            'receiver_id' => $receiver->getKey(),
            'receiver_type' => get_class($receiver),
        ]);
    }

    protected function query(User $user): Builder
    {
        $type = get_class($user);

        return Conversation::query()
            ->with($this->relationships)
            ->where(function (Builder $query) use ($type, $user) {
                return $query->where('sender_type', $type)
                    ->where('sender_id', $user->getKey());
            })
            ->where(function (Builder $query) use ($type, $user) {
                return $query->where('receiver_type', $type)
                    ->where('receiver_id', $user->getKey());
            });
    }
}
