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
        Schema::create('zalo_zns', function (Blueprint $table) {
            $table->increments('id');
            $table->string('code',1000)->nullable();
            $table->string('access_token_zns',1000)->nullable();
            $table->string('refresh_token_zns',1000)->nullable();
            $table->string('time_access_token',1000)->nullable();
            $table->string('time_refresh_token',1000)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('zalo_zns');
    }
};
