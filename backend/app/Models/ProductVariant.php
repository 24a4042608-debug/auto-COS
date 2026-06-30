<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

use App\Traits\BelongsToTenant;

class ProductVariant extends Model
{
    use BelongsToTenant;

    protected $fillable = [
        'tenant_id', 'product_id', 'sku', 'barcode', 'attribute_values',
        'price', 'sale_price', 'cost_price', 'stock', 'is_active',
    ];

    protected $casts = [
        'attribute_values' => 'array',
        'is_active'        => 'boolean',
        'price'            => 'decimal:2',
        'sale_price'       => 'decimal:2',
        'cost_price'       => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
