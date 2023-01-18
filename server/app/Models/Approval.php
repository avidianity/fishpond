<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

/**
 * @mixin IdeHelperApproval
 */
class Approval extends Model
{
    use HasFactory;
    use HasUuids;

    protected $fillable = [
        'approved',
    ];

    protected $casts = [
        'approved' => 'boolean',
    ];

    public function approvable(): MorphTo
    {
        return $this->morphTo();
    }
}
