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
        Schema::create('maps_workers', function (Blueprint $table) {
            $table->increments('id');
            $table ->integer('id_worker');
            $table ->string('lat')->nullable();
            $table ->string('lng')->nullable();
            $table->string('last_active')->nullable();
            $table->tinyInteger('is_online');
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maps_workers');
    }
};
