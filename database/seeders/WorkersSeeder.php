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
            'worker_firstname'=> 'Tran',
            'worker_name'=> 'Manh',
            'sort_name'=>'A01',
            'phone_ct'=>'0912847218',
            'kind_worker'=>0,
        ]);
        Worker::create([
            'worker_firstname'=> 'Tran 2',
            'worker_name'=> 'Manh',
            'sort_name'=>'B01',
            'phone_ct'=>'0912847232',
            'kind_worker'=>1,
        ]);
        Worker::create([
            'worker_firstname'=> 'Tran 3',
            'worker_name'=> 'Manh',
            'sort_name'=>'C01',
            'phone_ct'=>'09128472232',
            'kind_worker'=>2,
        ]);
    }
}
