<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * @mixin IdeHelperIssue
 */
class Issue extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'pond_id',
        'client_id',
        'message',
    ];

    public function pond(): BelongsTo
    {
        return $this->belongsTo(Pond::class);
    }

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
}
