<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Client\Issue\StoreRequest;
use App\Http\Resources\Client\IssueResource;

class IssueController extends Controller
{
    public function store(StoreRequest $request)
    {
        $issue = $request->client()
            ->issues()
            ->create($request->validated());

        return IssueResource::make($issue);
    }
}
