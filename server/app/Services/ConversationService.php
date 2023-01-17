<?php

namespace App\Services;

use App\Enums\MessageType;
use App\Models\Conversation;
use App\Models\File;
use App\Models\Message;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\UploadedFile;

class ConversationService
{
    protected array $relationships = [
        'sender',
        'receiver',
        'messages.sender',
        'messages.receiver',
    ];

    /**
     * @return Collection<int, Conversation>
     */
    public function all(User $user): Collection
    {
        return $this->query($user)->get()->filter(function (Conversation $conversation) {
            return !is_null($conversation->sender) && !is_null($conversation->receiver);
        });
    }

    /**
     * @return Collection<int, Conversation>
     */
    public function search(User $user, string $keyword): Collection
    {
        $matches = Conversation::search($keyword)->get();

        return $this->query($user)
            ->whereIn('id', $matches->map->getKey()->toArray())
            ->get()
            ->filter(function (Conversation $conversation) {
                return !is_null($conversation->sender) && !is_null($conversation->receiver);
            });
    }

    public function one(User $user, string $id): Conversation
    {
        /**
         * @var \App\Models\Conversation
         */
        $conversation = $this->query($user)->findOrFail($id);

        if (!is_null($conversation->sender) && !is_null($conversation->receiver)) {
            return $conversation;
        }

        throw (new ModelNotFoundException)->setModel($conversation, $id);
    }

    public function make(User $sender, User $receiver): Conversation
    {
        $senderType = get_class($sender);
        $receiverType = get_class($receiver);

        $conversation = Conversation::query()
            ->with($this->relationships)
            ->where(function (Builder $query) use ($senderType, $sender) {
                return $query->where(function (Builder $query) use ($senderType, $sender) {
                    return $query->where('sender_type', $senderType)
                        ->where('sender_id', $sender->getKey());
                })->orWhere(function (Builder $query) use ($senderType, $sender) {
                    return $query->where('receiver_type', $senderType)
                        ->where('receiver_id', $sender->getKey());
                });
            })
            ->where(function (Builder $query) use ($receiverType, $receiver) {
                return $query->where(function (Builder $query) use ($receiverType, $receiver) {
                    return $query->where('sender_type', $receiverType)
                        ->where('sender_id', $receiver->getKey());
                })->orWhere(function (Builder $query) use ($receiverType, $receiver) {
                    return $query->where('receiver_type', $receiverType)
                        ->where('receiver_id', $receiver->getKey());
                });
            })
            ->first();

        if ($conversation) {
            return $conversation;
        }

        return Conversation::create([
            'receiver_type' => $receiverType,
            'receiver_id' => $receiver->getKey(),
            'sender_type' => $senderType,
            'sender_id' => $sender->getKey(),
        ]);
    }

    public function sendText(User $sender, User $receiver, string $message): Message
    {
        $conversation = $this->make($sender, $receiver);

        return $conversation->messages()->create([
            'type' => MessageType::TEXT,
            'message' => $message,
            'receiver_type' => get_class($receiver),
            'receiver_id' => $receiver->getKey(),
            'sender_type' => get_class($sender),
            'sender_id' => $sender->getKey(),
        ]);
    }

    public function sendFile(User $sender, User $receiver, UploadedFile $uploadedFile): Message
    {
        $conversation = $this->make($sender, $receiver);

        $file = File::process($uploadedFile);

        return $conversation->messages()->create([
            'type' => MessageType::FILE,
            'message' => $file->url,
            'metadata' => [
                'type' => $file->type,
                'name' => $file->name,
                'size' => $file->size,
            ],
            'receiver_type' => get_class($receiver),
            'receiver_id' => $receiver->getKey(),
            'sender_type' => get_class($sender),
            'sender_id' => $sender->getKey(),
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
            ->orWhere(function (Builder $query) use ($type, $user) {
                return $query->where('receiver_type', $type)
                    ->where('receiver_id', $user->getKey());
            });
    }
}
