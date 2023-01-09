<?php

namespace App\Models;

use App\Enums\MessageType;
use Avidianity\LaravelExtras\Casts\JsonCast;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperMessage
 */
class Message extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'conversation_id',
        'receiver_type',
        'receiver_id',
        'sender_type',
        'sender_id',
        'metadata',
        'type',
        'message',
    ];

    protected $casts = [
        'metadata' => JsonCast::class,
        'type' => MessageType::class,
    ];

    public function conversation(): BelongsTo
    {
        return $this->belongsTo(Conversation::class);
    }

    public function sender(): MorphTo
    {
        return $this->morphTo();
    }

    public function receiver(): MorphTo
    {
        return $this->morphTo();
    }
}
