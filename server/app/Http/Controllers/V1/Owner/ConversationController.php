<?php

namespace App\Http\Controllers\V1\Owner;

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
        $owner = $request->owner();

        if ($request->has('keyword')) {
            $conversations = $this->service->search($owner, $request->input('keyword'));
        } else {
            $conversations = $this->service->all($owner);
        }

        return ConversationResource::collection($conversations);
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

    public function send(SendRequest $request)
    {
        $owner = $request->owner();

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
                $message = $this->service->sendText($owner, $model, $request->validated('message_text'));
                break;
            case MessageType::FILE:
                $message = $this->service->sendFile($owner, $model, $request->file('message_file'));
                break;
        }

        $message->load([
            'receiver',
            'sender',
        ]);

        return MessageResource::make($message);
    }
}
