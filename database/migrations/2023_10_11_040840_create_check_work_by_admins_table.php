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
        Schema::create('check_work_by_admins', function (Blueprint $table) {
            $table->id();
            $table->integer('id_work_ass');
            $table->integer('id_auth');
            $table->string('info_check',10000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('check_work_by_admins');
    }
};
