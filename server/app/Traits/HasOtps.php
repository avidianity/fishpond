<?php

namespace App\Traits;

use App\Models\Otp;

trait HasOtps
{
    protected static function bootHasOtps()
    {
        static::deleting(function (self $model) {
            $model->otps->each->delete();
        });
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\MorphMany
     */
    public function otps()
    {
        return $this->morphMany(Otp::class, 'otpable');
    }

    /**
     * @param  \App\Enums\OtpPurposeEnum|null  $purpose
     * @param  int|null  $code
     * @return \App\Models\Otp
     */
    public function createOtp($purpose = null, $code = null)
    {
        $this->otps()
            ->notUsed()
            ->get()
            ->each
            ->markAsUsed();

        $payload = [];

        if (! is_null($purpose)) {
            $payload['purpose'] = $purpose;
        }

        if (! is_null($code)) {
            $payload['code'] = $code;
        }

        return $this->otps()->create($payload);
    }
}
