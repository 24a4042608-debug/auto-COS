<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductVariant extends Model
{
    protected $fillable = [
        'product_id', 'sku', 'barcode', 'attributes',
        'price', 'sale_price', 'cost_price', 'stock', 'is_active',
    ];

    protected $casts = [
        'attributes' => 'array',
        'is_active'  => 'boolean',
        'price'      => 'decimal:2',
        'sale_price' => 'decimal:2',
        'cost_price' => 'decimal:2',
    ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
