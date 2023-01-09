<?php

namespace App\Http\Controllers\V1\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Client\Auth\LoginRequest;
use App\Http\Requests\V1\Client\Auth\RegisterRequest;
use App\Http\Requests\V1\Client\Auth\UpdateRequest;
use App\Http\Resources\Client\ClientResource;
use App\Models\Client;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;

class AuthController extends Controller
{
    protected JWTGuard $guard;

    public function __construct()
    {
        $this->guard = auth('clients');
    }

    public function login(LoginRequest $request)
    {
        if ($token = $this->guard->attempt($request->validated())) {
            /**
             * @var \App\Models\Client
             */
            $client = $this->guard->userOrFail();

            if (!$client->hasVerifiedEmail()) {
                return response()->json([
                    'key' => 'UNVERIFIED_EMAIL',
                    'message' => __('auth.unverified'),
                ], Response::HTTP_BAD_REQUEST);
            }

            return ClientResource::make($client)->additional([
                'type' => 'buyer',
                'access' => [
                    'type' => 'bearer',
                    'token' => $token,
                    'expiry' => config('jwt.ttl'),
                ],
            ]);
        }

        return response()->json([
            'key' => 'INVALID_PASSWORD',
            'message' => __('auth.password'),
        ], Response::HTTP_BAD_REQUEST);
    }

    public function register(RegisterRequest $request)
    {
        $client = Client::create($request->validated());

        event(new Registered($client));

        return response('', Response::HTTP_NO_CONTENT);
    }

    public function check()
    {
        return ClientResource::make($this->guard->userOrFail());
    }

    public function logout()
    {
        $this->guard->logout(true);

        return response('', Response::HTTP_NO_CONTENT);
    }

    public function update(UpdateRequest $request)
    {
        $client = $request->client();

        $client->update($request->validated());

        return ClientResource::make($client);
    }
}
