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
            'worker_phone' => $row[0], //CHUGOI
            'worker_call_date' => $row[1],//NGAY_BD
            'worker_call_start_time' => $row[2],//GIO_BD
            'worker_phone_called' => $row[3],//BIGOI
            'worker_call_time' => $row[4], //TG_GOI
        ]);
    }
}
