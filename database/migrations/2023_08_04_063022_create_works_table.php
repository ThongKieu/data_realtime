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
        Schema::create('works', function (Blueprint $table) {
            $table->id();
            $table->String('work_content', 500);
            $table->String('name_cus', 500)->nullable();
            $table->String('date_book');
            $table->String('work_note', 1000)->nullable();
            $table->String('street', 500)->nullable();
            $table->String('district');
            $table->integer('phone_number');
            $table->String('image_work_path',1000)->nullable();
            $table->tinyInteger('member_read')->default(0);
            $table->tinyInteger('kind_work')->default(0)->comment('0: điện nước; 1 điện lạnh; 2: Đồ gỗ ; 3: NLMT; 4: Xây dựng; 5: Tài Xế; 6: Cơ Khí');
            $table->tinyInteger('status_cus')->default(0)->comment('0: Chưa Phân; 1: Đã Phân; 2: Khách Hủy ');
            $table->tinyInteger('from_cus')->default(0)->comment('0: web; 1:app ; 2:nguồn khác kiểm tra ghi chú');
            $table->tinyInteger('flag_status')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('works');
    }
};
