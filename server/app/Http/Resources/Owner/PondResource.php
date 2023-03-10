<?php

namespace App\Http\Resources\Owner;

use App\Http\Resources\CommentResource;
use App\Http\Resources\RatingResource;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Pond
 */
class PondResource extends JsonResource
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
            'name' => $this->name,
            'status' => $this->status,
            'image' => [
                'url' => $this->image_url,
            ],
            'description' => $this->description,
            'images' => $this->images,
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'class' => $this->class,
            'price' => $this->price,
            'location_url' => $this->location_url,
            'square_meters' => $this->square_meters,
            'owner' => OwnerResource::make($this->whenLoaded('owner')),
            'comments' => CommentResource::collection($this->whenLoaded('comments')),
            'ratings' => RatingResource::collection($this->whenLoaded('ratings')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
