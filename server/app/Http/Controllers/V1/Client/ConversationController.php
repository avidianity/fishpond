<?php

namespace App\Http\Controllers\V1\Client;

use App\Enums\MessageType;
use App\Exceptions\InvalidUserException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Conversation\GetRequest;
use App\Http\Requests\V1\Conversation\SendRequest;
use App\Http\Requests\V1\Conversation\StoreRequest;
use App\Http\Resources\ConversationResource;
use App\Http\Resources\MessageResource;
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

    public function index(GetRequest $request)
    {
        $client = $request->client();

        if ($request->has('keyword')) {
            $conversations = $this->service->search($client, $request->input('keyword'));
        } else {
            $conversations = $this->service->all($client);
        }

        return ConversationResource::collection($conversations);
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

    public function send(SendRequest $request)
    {
        $client = $request->client();

        $types = [
            'administrator' => Administrator::class,
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

        $type = $request->enum('message_type', MessageType::class);

        switch ($type) {
            case MessageType::TEXT:
                $message = $this->service->sendText($client, $model, $request->validated('message_text'));
                break;
            case MessageType::FILE:
                $message = $this->service->sendFile($client, $model, $request->file('message_file'));
                break;
        }

        $message->load([
            'receiver',
            'sender',
        ]);

        return MessageResource::make($message);
    }
}
