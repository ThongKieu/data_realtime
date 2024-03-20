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
        Schema::create('popup_discounts', function (Blueprint $table) {
            $table->id();
            $table->string('popup_title',500);
            $table->string('popup_image',500);
            $table->string('popup_discount',500);
            $table->string('popup_description',500);
            $table->string('popup_date_begin',500);
            $table->string('popup_date_end',500);
            $table->tinyInteger('popup_status');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('popup_discounts');
    }
};
