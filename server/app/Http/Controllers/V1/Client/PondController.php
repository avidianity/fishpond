<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Client\Pond\CommentRequest;
use App\Http\Requests\V1\Client\Pond\GetRequest;
use App\Http\Requests\V1\Client\Pond\RateRequest;
use App\Http\Resources\Client\PondResource;
use App\Http\Resources\CommentResource;
use App\Http\Resources\RatingResource;
use App\Models\Client;
use App\Models\Comment;
use App\Models\Pond;
use App\Notifications\NewCommentNotification;
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

        if ($request->has('status')) {
            $builder->where('status', $request->validated('status'));
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
        return DB::transaction(function () use ($request) {
            /**
             * @var \App\Models\Pond
             */
            $pond = Pond::with('owner')->findOrFail($request->validated('pond_id'));

            $client = $request->client();

            $comment = $pond->commentFrom($client, $request->validated('message'));

            $pond->owner->notify(new NewCommentNotification($pond, $comment));

            $clients = Client::query()
                ->whereHas(
                    'comments',
                    fn ($query) =>
                    $query->where('commentable_type', Pond::class)
                        ->where('commentable_id', $pond->getKey())
                )
                ->where('id', '!=', $client->getKey())
                ->get();

            $clients->each(fn (Client $client) => $client->notify(new NewCommentNotification($pond, $comment)));

            return CommentResource::make($comment);
        });
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

    public function deleteComment(Comment $comment)
    {
        $comment->delete();

        return response()->noContent();
    }
}
