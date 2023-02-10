<?php

namespace App\Http\Controllers\V1\Administrator;

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
use App\Models\Pond;
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
        $administrator = $request->administrator();

        if ($request->has('keyword')) {
            $conversations = $this->service->search($administrator, $request->input('keyword'));
        } else {
            $conversations = $this->service->all($administrator);
        }

        return ConversationResource::collection($conversations);
    }

    public function show(Request $request, $id)
    {
        $administrator = $request->administrator();

        $conversation = $this->service->one($administrator, $id);

        return ConversationResource::make($conversation);
    }

    public function store(StoreRequest $request)
    {
        $administrator = $request->administrator();

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

        $pond = Pond::findOrFail($request->validated('pond_id'));

        $conversation = $this->service->make($administrator, $model, $pond);

        return ConversationResource::make($conversation);
    }

    public function send(SendRequest $request)
    {
        $administrator = $request->administrator();

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

        $pond = Pond::findOrFail($request->validated('pond_id'));

        switch ($type) {
            case MessageType::TEXT:
                $message = $this->service->sendText($administrator, $model, $pond, $request->validated('message_text'));
                break;
            case MessageType::FILE:
                $message = $this->service->sendFile($administrator, $model, $pond, $request->file('message_file'));
                break;
        }

        $message->load([
            'receiver',
            'sender',
        ]);

        return MessageResource::make($message);
    }
}
