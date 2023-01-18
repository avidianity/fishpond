<?php

namespace App\Http\Resources;

use App\Models\Pond;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin \App\Models\Approval
 */
class ApprovalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $userType = class_basename($request->user());

        $approvableType = class_basename($this->approvable_type);

        $resource = "App\\Http\\Resources\\{$userType}\\{$approvableType}Resource";

        if ($this->relationLoaded('approvable') &&  !is_null($this->approvable)) {
            $relationships = [];

            switch ($this->approvable_type) {
                case Pond::class:
                    $relationships = ['owner'];
                    break;
            }

            $this->approvable->load($relationships);
        }

        return [
            'id' => $this->getKey(),
            'approved' => $this->approved,
            'approvable' =>  $resource::make($this->whenLoaded('approvable')),
            'created_at' => $this->created_at,
        ];
    }
}
