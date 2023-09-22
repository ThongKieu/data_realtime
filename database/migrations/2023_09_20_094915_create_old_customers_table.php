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
        Schema::create('old_customers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('work_content', 1000) ;
            $table->string('name_cus', 500)->nullable();
            $table->string('date_book');
            $table->string('warranty_period',1000)->nullable();
            $table->string('add_cus', 500)->nullable();
            $table->string('des_cus')->nullable();
            $table->string('phone_cus');
            $table->string('note_cus', 1000)->nullable();
            $table->string('worker_name');
            $table->string('income_total')->nullable();
            $table->string('spending_total')->nullable();
            $table->string('seri_number')->nullable();
            $table->string('code_work')->nullable();
            $table->tinyInteger('cus_show')->default(0);
            $table->string('sort_name')->nullable();
            $table->integer('seri_number_check')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('old_customers');
    }
};
