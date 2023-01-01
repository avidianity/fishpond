<?php

namespace App\Http\Controllers\V1\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Owner\Pond\CommentRequest;
use App\Http\Requests\V1\Owner\Pond\StoreRequest;
use App\Http\Requests\V1\Owner\Pond\UpdateRequest;
use App\Http\Resources\CommentResource;
use App\Http\Resources\Owner\PondResource;
use App\Models\Pond;
use Illuminate\Http\Request;

class PondController extends Controller
{
    protected array $relationships;

    public function __construct()
    {
        $this->relationships = [
            'comments.senderable',
            'comments' => fn ($query) => $query->oldest(),
            'ratings'
        ];
    }

    public function index(Request $request)
    {
        $ponds = $request->owner()
            ->ponds()
            ->get();

        return PondResource::collection($ponds);
    }

    public function show(Request $request, $id)
    {
        $pond = $request->owner()
            ->ponds()
            ->with($this->relationships)
            ->findOrFail($id);

        return PondResource::make($pond);
    }

    public function store(StoreRequest $request)
    {
        $pond = $request->owner()
            ->ponds()
            ->create($request->validated());

        return PondResource::make($pond);
    }

    public function update(UpdateRequest $request, $id)
    {
        /**
         * @var \App\Models\Pond
         */
        $pond = $request->owner()
            ->ponds()
            ->findOrFail($id);

        $pond->update($request->validated());

        return PondResource::make($pond);
    }

    public function destroy(Request $request, $id)
    {
        $pond = $request->owner()
            ->ponds()
            ->findOrFail($id);

        $pond->delete();

        return response()->noContent();
    }

    public function comment(CommentRequest $request)
    {
        /**
         * @var \App\Models\Pond
         */
        $pond = Pond::findOrFail($request->validated('pond_id'));

        $comment = $pond->commentFrom($request->owner(), $request->validated('message'));

        return CommentResource::make($comment);
    }
}
