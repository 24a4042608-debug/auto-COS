<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'sku', 'barcode', 'name', 'slug', 'short_description', 'description',
        'category_id', 'brand_id', 'supplier_id',
        'cost_price', 'price', 'sale_price',
        'stock', 'min_stock',
        'seo_title', 'seo_description',
        'tags', 'has_variants', 'status',
    ];

    protected $casts = [
        'tags'         => 'array',
        'has_variants' => 'boolean',
        'cost_price'   => 'decimal:2',
        'price'        => 'decimal:2',
        'sale_price'   => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    public function supplier(): BelongsTo
    {
        return $this->belongsTo(Supplier::class);
    }

    public function variants(): HasMany
    {
        return $this->hasMany(ProductVariant::class);
    }

    public function assets(): BelongsToMany
    {
        return $this->belongsToMany(Asset::class, 'product_assets')
            ->withPivot('sort_order', 'is_primary')
            ->orderByPivot('sort_order');
    }

    public function primaryAsset(): BelongsToMany
    {
        return $this->assets()->wherePivot('is_primary', true);
    }
}
