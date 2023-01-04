<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Pond\CommentRequest;
use App\Http\Requests\V1\Administrator\Pond\GetRequest;
use App\Http\Resources\Administrator\PondResource;
use App\Http\Resources\CommentResource;
use App\Models\Pond;
use Illuminate\Http\Request;

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

    public function index(GetRequest $request)
    {
        $builder = Pond::query();

        if ($request->has('keyword')) {
            $ponds = Pond::search($request->validated('keyword'))->get();

            $builder->whereIn('id', $ponds->map->getKey()->toArray());
        }

        $ponds = $builder->with($this->relationships)
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

        $comment = $pond->commentFrom($request->administrator(), $request->validated('message'));

        return CommentResource::make($comment);
    }
}
