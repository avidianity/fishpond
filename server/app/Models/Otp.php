<?php

namespace App\Models;

use App\Enums\OtpPurposeEnum;
use Avidianity\LaravelExtras\Models\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @mixin IdeHelperOtp
 */
class Otp extends Model
{
    protected $fillable = [
        'otpable_id',
        'otpable_type',
        'uuid',
        'code',
        'used',
        'expiry',
        'purpose',
    ];

    protected $casts = [
        'purpose' => OtpPurposeEnum::class,
    ];

    protected static function booted()
    {
        static::creating(function (self $otp) {
            $otp->uuid = Str::uuid()->toString();
            if (! $otp->code) {
                $otp->code = otp(config('otp.size'));
            }
            $otp->expiry = config('otp.expiry');
        });
    }

    public function setCode($digits = null)
    {
        $this->code = otp($digits ?? config('otp.size'));

        return $this;
    }

    public function otpable()
    {
        return $this->morphTo();
    }

    public function scopeNotUsed($query)
    {
        return $query->where('used', false);
    }

    public function scopePurpose($query, OtpPurposeEnum|string $purpose)
    {
        if (is_string($purpose)) {
            $purpose = OtpPurposeEnum::from($purpose);
        }

        return $query->where('purpose', $purpose->value);
    }

    public function isExpired()
    {
        return ! Carbon::parse($this->created_at)
            ->addMinutes($this->expiry)
            ->isFuture();
    }

    public function markAsUsed()
    {
        $this->update(['used' => true]);

        return $this;
    }
}
