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
        Schema::create('warranties', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('id_work_has');
            $table->string('warranty_time', 500);
            $table->string('warranty_info', 1000);
            $table->string('unit')->default('n')->comment('d: ngày; m: tháng; y: năm; w: tuần');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('warranties');
    }
};
