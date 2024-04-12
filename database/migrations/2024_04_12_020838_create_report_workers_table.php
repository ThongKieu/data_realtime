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
        Schema::create('report_workers', function (Blueprint $table) {
            $table->id();
            $table -> integer('id_worker');
            // $table -> integer('id_work_has');
            $table -> string('date_do');
            $table-> integer('work_revenue');
            $table-> integer('work_expenditure');
            $table->tinyInteger('flag_check')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_workers');
    }
};
