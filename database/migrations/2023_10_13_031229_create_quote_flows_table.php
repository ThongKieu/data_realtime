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
        Schema::create('quote_flows', function (Blueprint $table) {
            $table->id();
            $table->string('id_work');
            $table->string('staff_in_change_id')->nullable();
            $table->string('staff_in_create_id')->nullable();   
            $table->integer('total')->default(0);
            $table->integer('expense')->default(0);     
            $table->integer('pripot_percent')->default(0);     
            $table->tinyInteger('status')->default(0)->comment('0: Chưa Xử Lý; 1: Chưa liên hệ được khách; 2: Đã Gửi Báo Giá; 3:Đã Hẹn Ngày Làm ; 4;Khách Chưa Phản Hồi ; 5:Khách Không Chốt ; 6:Thợ Không Làm Được ,7:thợ tự gửi, 8: chưa cham soc; 9: đã chăm sóc');
            $table->string('date_do')->nullable();
            $table->integer('to_table');
            $table->string('quote_date_do')->nullable();      
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('quote_flows');
    }
};
