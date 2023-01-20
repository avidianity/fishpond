<?php

namespace App\Http\Controllers\V1\Owner;

use App\Http\Controllers\Controller;
use App\Http\Resources\Owner\OwnerResource;
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
