<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Owner\StoreRequest;
use App\Http\Requests\V1\Administrator\Owner\UpdateRequest;
use App\Http\Resources\Administrator\OwnerResource;
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

    public function store(StoreRequest $request)
    {
        $owner = Owner::create($request->validated());

        return OwnerResource::make($owner);
    }

    public function update(UpdateRequest $request, Owner $owner)
    {
        $owner->update($request->validated());

        return OwnerResource::make($owner);
    }

    public function destroy(Owner $owner)
    {
        $owner->delete();

        return response()->noContent();
    }
}
