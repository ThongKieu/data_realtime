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
        Schema::create('fuel_o_t_workers', function (Blueprint $table) {
            $table->id();
            $table->integer('fuel_o_t_workers_id');
            $table->string('fuel_o_t_workers_content',500);
            $table->integer('fuel_o_t_workers_spend_money')->default(0);
            $table->string('fuel_o_t_workers_date_set');
            $table->tinyInteger('fuel_o_t_workers_flag')->default(0)->comment('0: chua xac nhan, 1: xac nhan, 2: tu choi');
            $table->integer('fuel_o_t_id_admin_check')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fuel_o_t_workers');
    }
};
