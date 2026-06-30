<?php

namespace App\Traits;

use App\Models\Tenant;
use Illuminate\Database\Eloquent\Builder;

trait BelongsToTenant
{
    protected static function bootBelongsToTenant(): void
    {
        static::creating(function ($model) {
            if (empty($model->tenant_id)) {
                $model->tenant_id = static::resolveTenantId();
            }
        });

        static::addGlobalScope('tenant', function (Builder $builder) {
            $tenantId = static::resolveTenantId();
            if ($tenantId !== null) {
                $builder->where($builder->getQuery()->from . '.tenant_id', $tenantId);
            }
        });
    }

    public function tenant()
    {
        return $this->belongsTo(Tenant::class);
    }

    protected static function resolveTenantId(): ?int
    {
        // 1. Check if a tenant ID is explicitly bound in the app container
        if (app()->bound('tenant_id')) {
            return app('tenant_id');
        }

        // 2. Check if a user is logged in and belongs to a tenant
        if (auth()->check() && auth()->user()->tenant_id) {
            return auth()->user()->tenant_id;
        }

        return null;
    }
}
