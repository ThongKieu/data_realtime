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
        Schema::create('view_sales', function (Blueprint $table) {
            $table->increments('id');
            $table->longText('content_view_sale')->nullable();
            $table->string('sale_percent')->nullable();
            $table->string('time_begin');
            $table->string('time_end');
            $table->string('image_path')->nullable();
            $table ->tinyInteger('flag')->default('1');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('view_sales');
    }
};
