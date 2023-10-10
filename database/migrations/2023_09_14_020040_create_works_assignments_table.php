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
        Schema::create('works_assignments', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_cus');
            $table->bigInteger('id_worker');
            $table->bigInteger('id_phu')->default(0);
            $table->string('real_note', 500)->nullable();
            $table->bigInteger('spending_total')->default(0);
            $table->bigInteger('income_total')->default(0);
            $table->string('seri_imag', 1000)->nullable();
            $table->string('bill_imag', 500)->nullable();
            $table ->tinyInteger('status_work')->default(0)->comment ('0: đang làm; 1: Mai làm tiếp ; 2:Đã xong; 3:Khảo sát; 4: Đã Trả ; 5: Khách Hủy');
			$table ->tinyInteger('check_in')->default(0)->comment ('0: Chưa checkin; 1: Đã checkin');
            $table->string('seri_number')->nullable();
            $table->string('work_done_date')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('works_assignments');
    }
};
