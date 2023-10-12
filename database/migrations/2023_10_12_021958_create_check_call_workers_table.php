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
        Schema::create('check_call_workers', function (Blueprint $table) {
            $table->id();
            $table->string('worker_phone',1000);
            $table->string('worker_phone_called',1000);
            $table->string('worker_call_date',1000);
            $table->string('worker_call_time',1000);
            $table->string('worker_call_start_time',1000);
            $table ->integer('worker_call_check')->default(0);;
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_call_workers');
    }
};
