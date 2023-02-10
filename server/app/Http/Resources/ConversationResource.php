<?php

namespace App\Http\Resources;

use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * @mixin \App\Models\Conversation
 */
class ConversationResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @re`turn array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $base =  "\\App\\Http\\Resources\\" . class_basename($request->user());

        $resource = "{$base}\\PondResource";

        return [
            'id' => $this->getKey(),
            'receiver' => $this->mapUser($this->receiver),
            'sender' => $this->mapUser($this->sender),
            'messages' => MessageResource::collection($this->whenLoaded('messages')),
            'pond' => $resource::make($this->whenLoaded('pond')),
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
            'image' => [
                'url' => data_get($user, 'image_url'),
            ],
        ];
    }
}
