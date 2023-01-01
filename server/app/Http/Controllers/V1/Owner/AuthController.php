<?php

namespace App\Http\Controllers\V1\Owner;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Owner\Auth\LoginRequest;
use App\Http\Requests\V1\Owner\Auth\RegisterRequest;
use App\Http\Resources\Owner\OwnerResource;
use App\Models\Owner;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use PHPOpenSourceSaver\JWTAuth\JWTGuard;

class AuthController extends Controller
{
    protected JWTGuard $guard;

    public function __construct()
    {
        $this->guard = auth('owners');
    }

    public function login(LoginRequest $request)
    {
        if ($token = $this->guard->attempt($request->validated())) {
            $owner = $this->guard->userOrFail();

            return OwnerResource::make($owner)->additional([
                'type' => 'seller',
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
        $owner = Owner::create($request->validated());

        event(new Registered($owner));

        return response('', Response::HTTP_NO_CONTENT);
    }

    public function check()
    {
        return OwnerResource::make($this->guard->userOrFail());
    }

    public function logout()
    {
        $this->guard->logout(true);

        return response('', Response::HTTP_NO_CONTENT);
    }
}
