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
        Schema::create('work_lists', function (Blueprint $table) {
            $table->id();
            $table->string('work_content',500);
            $table->string('work_distric');
            $table->string('work_phone');
            $table->string('work_name_cus');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_lists');
    }
};
