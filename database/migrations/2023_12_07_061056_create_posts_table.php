<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->increments('id');
            $table -> string('title');
            $table -> string('slug');
            $table -> longText('description')->nullable();
            $table -> longText('content');
            $table -> string('image_post')->nullable();
            $table -> string('name_author');
            $table -> string('admin_del')->default('0');
            $table -> string('flag');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
