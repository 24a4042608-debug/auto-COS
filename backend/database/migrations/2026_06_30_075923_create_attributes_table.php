<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('attributes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('tenant_id')->constrained()->cascadeOnDelete();
            $table->string('name');
            $table->string('code');
            $table->string('type'); // 'text', 'number', 'select', 'multiselect'
            $table->json('options')->nullable(); // Predefined options for select/multiselect
            $table->boolean('is_variant')->default(false); // True if used to generate variants (e.g. Size, Color)
            $table->boolean('is_filterable')->default(true); // True if used for filtering
            $table->timestamps();

            $table->unique(['tenant_id', 'code']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('attributes');
    }
};
