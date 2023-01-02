<?php

namespace App\Traits;

use App\Models\Client;
use App\Models\Rating;
use Illuminate\Database\Eloquent\Relations\MorphMany;

trait HasRatings
{
    protected static function bootHasRatings()
    {
        static::deleting(function (self $model) {
            $model->ratings->each->delete();
        });
    }

    public function ratings(): MorphMany
    {
        return $this->morphMany(Rating::class, 'rateable');
    }

    public function rate(Client $client, int|float $value): Rating
    {
        return $this->ratings()->updateOrCreate(['client_id' => $client->getKey()], ['value' => $value]);
    }
}
