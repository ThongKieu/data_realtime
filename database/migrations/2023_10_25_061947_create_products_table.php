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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name_product',500);
            $table->string('code_product',1000);
            $table->string('provider_product',1000)->nullable();
            $table->string('phone_product',1000)->nullable();
            $table->integer('price_product');
            $table->integer('sale_price_product')->default(0);
            $table->string('image_product',1000)->default('assets/images/siteico.png,');
            $table->integer('member_insert')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
