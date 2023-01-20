<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Resources\Client\OwnerResource;
use App\Models\Owner;

class OwnersController extends Controller
{
    public function index()
    {
        return OwnerResource::collection(Owner::all());
    }

    public function show(Owner $owner)
    {
        return OwnerResource::make($owner);
    }
}
