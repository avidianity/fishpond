<?php

namespace App\Http\Resources;

use App\Models\Administrator;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * @mixin \App\Models\Message
 */
class MessageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'conversation' => ConversationResource::make($this->whenLoaded('conversation')),
            'receiver' => $this->mapUser($this->receiver),
            'sender' => $this->mapUser($this->sender),
            'metadata' => $this->metadata,
            'type' => $this->type,
            'message' => $this->message,
            'timestamp' => $this->created_at,
        ];
    }

    protected function mapUser(User $user): array
    {
        return [
            'id' => $user->getKey(),
            'type' => Str::lower(class_basename($user)),
            'first_name' => data_get($user, 'first_name'),
            'last_name' => data_get($user, 'last_name'),
            'email' => data_get($user, 'email'),
        ];
    }
}
