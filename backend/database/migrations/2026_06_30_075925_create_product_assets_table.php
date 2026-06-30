<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_assets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->cascadeOnDelete();
            $table->foreignId('asset_id')->constrained()->cascadeOnDelete();
            $table->integer('sort_order')->default(0);
            $table->boolean('is_primary')->default(false);
            $table->timestamps();

            $table->unique(['product_id', 'asset_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_assets');
    }
};
