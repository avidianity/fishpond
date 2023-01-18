<?php

namespace App\Http\Controllers\V1\Administrator;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Administrator\Pond\CommentRequest;
use App\Http\Requests\V1\Administrator\Pond\GetRequest;
use App\Http\Resources\Administrator\PondResource;
use App\Http\Resources\CommentResource;
use App\Models\Comment;
use App\Models\Pond;
use App\Notifications\NewCommentNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PondController extends Controller
{
    protected array $relationships;

    public function __construct()
    {
        $this->relationships = [
            'owner',
            'comments.senderable',
            'comments' => fn ($query) => $query->oldest(),
            'ratings',
            'approval'
        ];
    }

    public function index(GetRequest $request)
    {
        $builder = Pond::approved();

        if ($request->has('keyword')) {
            $ponds = Pond::search($request->validated('keyword'))->get();

            $builder->whereIn('id', $ponds->map->getKey()->toArray());
        }

        if ($request->has('status')) {
            $builder->where('status', $request->validated('status'));
        }

        $ponds = $builder->with($this->relationships)
            ->get();

        return PondResource::collection($ponds);
    }

    public function show($id)
    {
        $pond = Pond::query()
            ->with($this->relationships)
            ->findOrFail($id);

        return PondResource::make($pond);
    }

    public function destroy(Request $request, Pond $pond)
    {
        $pond->delete();

        return response()->noContent();
    }

    public function comment(CommentRequest $request)
    {
        return DB::transaction(function () use ($request) {
            /**
             * @var \App\Models\Pond
             */
            $pond = Pond::with('owner')->findOrFail($request->validated('pond_id'));

            $comment = $pond->commentFrom($request->administrator(), $request->validated('message'));

            $pond->owner->notify(new NewCommentNotification($pond, $comment));

            return CommentResource::make($comment);
        });
    }

    public function deleteComment(Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
