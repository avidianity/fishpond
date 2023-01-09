<?php

namespace App\Http\Controllers\V1\Owner;

use App\Enums\OtpPurposeEnum;
use App\Exceptions\ForgotPasswordException;
use App\Exceptions\ThrottleRequestsException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Owner\ForgotPassword\FinalizeRequest;
use App\Http\Requests\V1\Owner\ForgotPassword\SendRequest;
use App\Http\Requests\V1\Owner\ForgotPassword\VerifyRequest;
use App\Models\Otp;
use App\Models\Owner;
use App\Notifications\ResetPasswordNotification;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\RateLimiter;

class ForgotPasswordController extends Controller
{
    public function send(SendRequest $request)
    {
        return DB::transaction(function () use ($request) {
            if ($user = $this->getUser($request->validated('email'))) {
                $key = $request->ip().':'.$user->getKey();

                if (RateLimiter::tooManyAttempts($key, config('otp.throttle'))) {
                    $seconds = RateLimiter::availableIn($key);

                    throw new ThrottleRequestsException(
                        $seconds,
                    );
                }

                RateLimiter::hit($key);

                $otp = $user->createOtp(OtpPurposeEnum::FORGOT_PASSWORD);

                $user->notify(new ResetPasswordNotification($otp->code));

                return response()->json([
                    'message' => trans('passwords.sent'),
                    'otp_id' => $otp->getKey(),
                ]);
            }

            throw new ForgotPasswordException(trans('passwords.user'), 'EMAIL_DOES_NOT_EXIST');
        });
    }

    public function verify(VerifyRequest $request)
    {
        ['otp_id' => $id, 'code' => $code] = $request->validated();
        if ($otp = Otp::where('code', $code)->notUsed()->find($id)) {
            if ($otp->isExpired()) {
                throw new ForgotPasswordException(trans('passwords.expired'), 'OTP_IS_EXPIRED');
            }

            return response()->json([
                'verification_id' => $otp->uuid,
            ]);
        }

        throw new ForgotPasswordException(trans('passwords.otp'), 'OTP_ID_OR_CODE_IS_INVALID');
    }

    public function finalize(FinalizeRequest $request)
    {
        ['verification_id' => $id, 'password' => $password] = $request->validated();

        if ($otp = Otp::where('uuid', $id)->notUsed()->with('otpable')->first()) {
            $user = $otp->otpable;

            $user->update(['password' => $password]);

            $otp->markAsUsed();

            return response()->json([
                'message' => trans('passwords.reset'),
            ]);
        }

        throw new ForgotPasswordException(trans('passwords.verification'), 'VERIFICATION_ID_IS_INVALID');
    }

    protected function getUser(string $email): ?Owner
    {
        return Owner::whereEmail($email)->first();
    }
}
