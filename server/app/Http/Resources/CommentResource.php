<?php

namespace App\Http\Resources;

use App\Models\Administrator;
use App\Models\Client;
use App\Models\Owner;
use App\Models\Pond;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * @mixin \App\Models\Comment
 */
class CommentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $sender = $this->whenLoaded('senderable');

        $resource = null;

        $user = $request->user();

        $base =  "\\App\\Http\\Resources\\" . class_basename($user);

        if ($sender instanceof Model) {
            $resource = match (get_class($sender)) {
                Administrator::class => "{$base}\\AdministratorResource",
                Owner::class => "{$base}\\OwnerResource",
                Client::class => "{$base}\\ClientResource",
            };
        }

        $data = [
            'id' => $this->getKey(),
            'sender_type' => $this->when(!is_null($resource), Str::lower(class_basename($this->senderable_type))),
            'sender' => $this->when(!is_null($resource), function () use ($resource, $sender) {
                return $resource::make($sender);
            }),
            'host' => $this->when($this->relationLoaded('commentable'), function () use ($base) {
                $resource = match (get_class($this->commentable)) {
                    Pond::class => "{$base}\\PondResource",
                };

                return $resource::make($this->commentable);
            }),
            'message' => $this->message,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];

        return $data;
    }
}
