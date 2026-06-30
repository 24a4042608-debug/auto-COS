<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('filename');
            $table->string('original_name');
            $table->string('disk')->default('local'); // local, s3
            $table->string('path');
            $table->string('url');
            $table->string('mime_type');
            $table->enum('type', ['image', 'video'])->default('image');
            $table->unsignedBigInteger('size')->default(0); // bytes
            $table->integer('width')->nullable();
            $table->integer('height')->nullable();
            $table->json('tags')->nullable();
            $table->string('alt_text')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
