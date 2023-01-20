<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\Client\OwnerResource;
use App\Models\Owner;

class OwnersController extends Controller
{
    protected array $relationships;

    public function __construct()
    {
        $this->relationships = [
            'ponds' => fn ($query) => $query->whereHas('approval', fn ($query) => $query->where('approved', true)),
            'ponds.ratings',
        ];
    }

    public function index()
    {
        return OwnerResource::collection(Owner::all());
    }

    public function show(Owner $owner)
    {
        $owner->load($this->relationships);

        return OwnerResource::make($owner);
    }
}
