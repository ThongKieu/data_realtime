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
        Schema::create('workers', function (Blueprint $table) {
            $table->id();
            $table->string('worker_full_name');
            $table->string('worker_code')->nullable();
            $table->string('worker_BHXH')->nullable();
            $table->string('worker_BHXH_time')->nullable();
            $table->string('worker_BHBV')->nullable();
            $table->string('worker_BHBV_money')->nullable();
            $table->string('worker_date_of_birth')->nullable();
            $table->string('worker_CCCD')->nullable();
            $table->string('worker_CCCD_date')->nullable();
            $table->string('worker_CMND')->nullable();
            $table->string('worker_CMND_date')->nullable();
            $table->string('worker_address', 500)->nullable();
            $table->string('worker_ward')->nullable();
            $table->string('worker_district')->nullable();
            $table->string('worker_city')->nullable();
            $table->string('worker_phone_company')->nullable();
            $table->string('worker_tax_TNCN')->nullable();
            $table->string('worker_phone_personal')->nullable();
            $table->string('worker_phone_family')->nullable();
            $table->string('worker_date_ATLD2')->nullable();
            $table->string('worker_date_ATLD3')->nullable();
            $table->string('worker_date_ATLD4')->nullable();
            $table->string('worker_degree_school')->nullable();
            $table->string('worker_degree')->nullable();
            $table->string('worker_degree_major')->nullable();
            $table->string('worker_degree_rate')->nullable();
            $table->string('worker_degree_time_train')->nullable();
            $table->string('worker_degree_date')->nullable();
            $table->string('worker_degree_time_effective')->nullable();
            $table->string('worker_profile')->nullable();
            $table->string('worker_presenter')->nullable();
            $table->string('worker_time_start_work')->nullable();
        
            $table->string('worker_path')->nullable();
            $table -> tinyInteger('worker_kind')->default(0)->comment('0: điện nước; 1 điện lạnh; 2: Đồ gỗ ; 3: NLMT; 4: Xây dựng; 5: Tài Xế; 6: Cơ Khí');
            $table -> tinyInteger('worker_has_work')->default(0);
            $table -> tinyInteger('worker_status')->default(0)->comment('0: Đang làm; 1: Nghỉ Phép; 2: Nghỉ luôn ');
            $table-> tinyInteger('worker_check_acc')->default('0');
            $table->string('worker_avatar')->nullable();
            // thêm chỗ này doanh số ngày của thợ để tính hệ số tăng ca 
            $table->integer('worker_daily_sales')->default('570000');
            $table->integer('worker_daily_o_t_by_hour')->default('37000');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('workers');
    }
};
