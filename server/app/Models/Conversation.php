<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Laravel\Scout\Searchable;

/**
 * @mixin IdeHelperConversation
 */
class Conversation extends Model
{
    use HasFactory;
    use HasUuids;
    use Searchable;

    protected $fillable = [
        'receiver_type',
        'receiver_id',
        'sender_type',
        'sender_id',
    ];

    public function sender(): MorphTo
    {
        return $this->morphTo();
    }

    public function receiver(): MorphTo
    {
        return $this->morphTo();
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class);
    }

    public function toSearchableArray()
    {
        $this->load(['sender', 'receiver']);

        return [
            'sender' => [
                'first_name' => data_get($this, 'sender.first_name'),
                'last_name' => data_get($this, 'sender.last_name'),
                'email' => data_get($this, 'sender.email'),
            ],
            'receiver' => [
                'first_name' => data_get($this, 'receiver.first_name'),
                'last_name' => data_get($this, 'receiver.last_name'),
                'email' => data_get($this, 'receiver.email'),
            ],
        ];
    }
}
