<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\BelongsToTenant;

class Import extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id', 'user_id', 'original_filename', 'stored_path', 'status',
        'total_rows', 'processed_rows', 'success_rows', 'failed_rows',
        'errors', 'result_path',
    ];

    protected $casts = [
        'errors' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
