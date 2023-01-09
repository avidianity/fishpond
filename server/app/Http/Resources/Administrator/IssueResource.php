<?php

namespace App\Http\Resources\Administrator;

use App\Http\Resources\Owner\PondResource;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Issue
 */
class IssueResource extends JsonResource
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
            'id' => $this->getKey(),
            'message' => $this->message,
            'pond' => PondResource::make($this->whenLoaded('pond')),
            'client' => ClientResource::make($this->whenLoaded('client')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
