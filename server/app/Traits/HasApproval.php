<?php

namespace App\Traits;

use App\Models\Approval;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\MorphOne;

/**
 * @mixin \Illuminate\Database\Eloquent\Model
 */
trait HasApproval
{
    protected static function bootHasApproval()
    {
        static::created(function (self $model) {
            $model->approval()->create([
                'approved' => false,
            ]);
        });
    }

    public function approval(): MorphOne
    {
        return $this->morphOne(Approval::class, 'approvable');
    }

    public function scopeApproved(Builder $query, bool $approved = true)
    {
        return $query->whereHas('approval', fn (Builder $query) => $query->where('approved', $approved));
    }
}
