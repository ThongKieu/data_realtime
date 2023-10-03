<?php

namespace App\Imports;


use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\Worker;
class WorkerImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Worker([
            'worker_name' => $row[0],
            'sort_name' => $row[1],
            'add_worker' => $row[2],
            'phone_ct' => $row[3],
            'phone_cn' => $row[4],
            'kind_worker' => $row[5],
        ]);
    }
}
