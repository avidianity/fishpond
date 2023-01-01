<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Resources\Administrator\IssueResource;
use App\Models\Issue;

class IssueController extends Controller
{
    protected array $relationships = ['pond.owner', 'client'];

    public function index()
    {
        $issues = Issue::query()
            ->with($this->relationships)
            ->get();

        return IssueResource::collection($issues);
    }

    public function show(Issue $issue)
    {
        $issue->load($this->relationships);

        return IssueResource::make($issue);
    }
}
