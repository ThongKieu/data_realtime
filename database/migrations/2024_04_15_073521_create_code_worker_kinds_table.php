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
        Schema::create('code_worker_kinds', function (Blueprint $table) {
            $table->id();
            $table->string('code_worker',100);
            $table->string('kind_worker',100);
            $table->string('special_code_worker',200)->nullable();
            $table->string('descript_code_worker',200);
            $table->tinyInteger('status_code_worker')->default(1)->comment('0:chưa kích hoạt; 1: kích hoạt;2: đã bỏ ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('code_worker_kinds');
    }
};
