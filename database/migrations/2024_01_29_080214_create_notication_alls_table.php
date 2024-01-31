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
        Schema::create('notication_alls', function (Blueprint $table) {
            $table->id();
            $table->string('from_table')->nullable()->comment('1: Bảng lịch; 2: Khách phàn nàn; 3: lịch app; 4: Thông báo thợ');
            $table->string('info_notication')->nullable();
            // $table -> tinyInteger('flag_noti')->default(0);
            $table->string('user_read')->default('');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notication_alls');
    }
};
