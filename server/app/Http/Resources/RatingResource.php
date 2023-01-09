<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Rating
 */
class RatingResource extends JsonResource
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
            'id' => $this->id,
            'rateable_type' => $this->rateable_type,
            'rateable_id' => $this->rateable_id,
            'client_id' => $this->client_id,
            'value' => $this->value,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
