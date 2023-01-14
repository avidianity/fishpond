<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Client\Issue\StoreRequest;
use App\Http\Resources\Client\IssueResource;
use App\Models\Administrator;
use App\Notifications\ReportedPondNotification;

class IssueController extends Controller
{
    public function store(StoreRequest $request)
    {
        $issue = $request->client()
            ->issues()
            ->create($request->validated());

        $administrators = Administrator::all();

        $administrators->each->notify(new ReportedPondNotification($issue));

        return IssueResource::make($issue);
    }
}
