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
        Schema::create('quotations', function (Blueprint $table) {
            $table->id();
            //'id_work_has' 'id_auth', 'quote_date', 'quote_info','quote_total_price','quote_status',
            $table->tinyInteger('id_work_has');
            $table->tinyInteger('id_auth')->default(0);
            $table->string('quote_date');
            $table->string('quote_info',5000);
            $table->string('quote_note',1000)->nullable();
            $table->string('quote_cus_info',1000)->nullable();
            $table->string('quote_user_info',1000)->nullable();
            $table->tinyInteger('vat')->default(0);
            $table->integer('quote_total_price')->default(0);
            $table->tinyInteger('quote_status')->default(0);
            $table->string('quote_image',1000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quotations');
    }
};
