<?php

namespace App\Imports;

use App\Models\CheckCallWorker;
use Maatwebsite\Excel\Concerns\ToModel;
class ImportCheckCallWorker implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new CheckCallWorker([
            'worker_phone' => $row[0],
            'worker_phone_called' => $row[2],
            'worker_call_date' => $row[1],
            'worker_call_time' => $row[3],
            'worker_call_start_time' => $row[4],
        ]);
    }
}
