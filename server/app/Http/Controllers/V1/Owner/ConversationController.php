<?php

namespace App\Http\Controllers\V1\Owner;

use App\Exceptions\InvalidUserException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Conversation\StoreRequest;
use App\Http\Resources\ConversationResource;
use App\Models\Administrator;
use App\Models\Client;
use App\Models\Owner;
use App\Services\ConversationService;
use Illuminate\Foundation\Auth\User;
use Illuminate\Http\Request;

class ConversationController extends Controller
{
    public function __construct(protected ConversationService $service)
    {
        //
    }

    public function index(Request $request)
    {
        $owner = $request->owner();

        return ConversationResource::collection($this->service->all($owner));
    }

    public function show(Request $request, $id)
    {
        $owner = $request->owner();

        $conversation = $this->service->one($owner, $id);

        return ConversationResource::make($conversation);
    }

    public function store(StoreRequest $request)
    {
        $owner = $request->owner();

        $types = [
            'owner' => Administrator::class,
            'buyer' => Client::class,
            'seller' => Owner::class,
        ];

        $class = $types[$request->validated('receiver_type')];

        /**
         * @var User|null
         */
        $model = $class::find($request->validated('receiver_id'));

        if (!$model) {
            throw new InvalidUserException;
        }

        $conversation = $this->service->make($owner, $model);

        return ConversationResource::make($conversation);
    }
}
