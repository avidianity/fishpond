<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Client\Pond\CommentRequest;
use App\Http\Requests\V1\Client\Pond\RateRequest;
use App\Http\Resources\Client\PondResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\RatingResource;
use App\Models\Pond;

class PondController extends Controller
{
    protected array $relationships;

    public function __construct()
    {
        $this->relationships = [
            'owner',
            'comments.senderable',
            'comments' => fn ($query) => $query->oldest(),
            'ratings'
        ];
    }

    public function index()
    {
        $ponds = Pond::query()
            ->with($this->relationships)
            ->get();

        return PondResource::collection($ponds);
    }

    public function show(Pond $pond)
    {
        $pond->load($this->relationships);

        return PondResource::make($pond);
    }

    public function comment(CommentRequest $request)
    {
        /**
         * @var \App\Models\Pond
         */
        $pond = Pond::findOrFail($request->validated('pond_id'));

        $comment = $pond->commentFrom($request->client(), $request->validated('message'));

        return CommentResource::make($comment);
    }

    public function rate(RateRequest $request)
    {
        /**
         * @var \App\Models\Pond
         */
        $pond = Pond::findOrFail($request->validated('pond_id'));

        $rating = $pond->rate($request->client(), $request->validated('value'));

        return RatingResource::make($rating);
    }
}
