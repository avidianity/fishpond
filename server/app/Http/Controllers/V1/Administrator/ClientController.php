<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Client\StoreRequest;
use App\Http\Requests\V1\Administrator\Client\UpdateRequest;
use App\Http\Resources\Administrator\ClientResource;
use App\Models\Client;

class ClientController extends Controller
{
    public function index()
    {
        return ClientResource::collection(Client::all());
    }

    public function show(Client $client)
    {
        return ClientResource::make($client);
    }

    public function store(StoreRequest $request)
    {
        $client = Client::create($request->validated());

        return ClientResource::make($client);
    }

    public function update(UpdateRequest $request, Client $client)
    {
        $client->update($request->validated());

        return ClientResource::make($client);
    }

    public function destroy(Client $client)
    {
        $client->delete();

        return response()->noContent();
    }
}
