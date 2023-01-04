<?php

namespace App\Http\Controllers\V1\Client;

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
        $client = $request->client();

        return ConversationResource::collection($this->service->all($client));
    }

    public function show(Request $request, $id)
    {
        $client = $request->client();

        $conversation = $this->service->one($client, $id);

        return ConversationResource::make($conversation);
    }

    public function store(StoreRequest $request)
    {
        $client = $request->client();

        $types = [
            'client' => Administrator::class,
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

        $conversation = $this->service->make($client, $model);

        return ConversationResource::make($conversation);
    }
}
