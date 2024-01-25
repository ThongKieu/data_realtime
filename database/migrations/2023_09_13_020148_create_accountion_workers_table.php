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
        Schema::create('accountion_workers', function (Blueprint $table) {
            $table->increments('id');
            $table ->integer('id_worker');
            $table ->string('acc_worker');
            $table ->string('pass_worker');
            $table->string('avatar')->default('assets/avatar/avata1.png');
            $table ->string('device_key')->nullable();
            $table->longText('FCM_token')->nullable();
            $table->string('last_active')->nullable();
            $table->tinyInteger('active')->default(0)->comment('0: tạm khóa; 1: mở; 2: khóa vĩnh viễn');
            $table ->tinyInteger('time_log')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('accountion_workers');
    }
};
