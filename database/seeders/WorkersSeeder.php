<?php

namespace Database\Seeders;

use App\Models\Worker;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class WorkersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Worker::create([
            'worker_full_name' => 'Tran',            // Họ và tên
            'worker_code' =>'A01', 
            'worker_phone_company'=>'0912847218',
            'worker_kind'=>0,
        ]);
        Worker::create([
            'worker_full_name' => 'Thong Kieu',            // Họ và tên
            'worker_code' =>'A02', 
            'worker_phone_company'=>'09182722232',
            'worker_kind'=>1,

           
        ]);
        Worker::create([
            'worker_full_name'=> 'Tung Phan',
            'worker_code'=>'C01',
            'worker_phone_company'=>'0918472232',
            'worker_kind'=>2,
        ]);
    }
}
