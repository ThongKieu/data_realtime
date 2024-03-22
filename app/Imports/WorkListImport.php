<?php

namespace App\Imports;

use App\Http\Controllers\Api\WorkListController;
use Illuminate\Support\Collection;
use App\Models\WorkList;
use Maatwebsite\Excel\Concerns\ToModel;

class WorkListImport implements ToModel
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        return new WorkList([
            'work_content' => $row[0], 
            'work_distric' => $row[1], 
            'work_name_cus' => $row[2],
            'work_phone' => WorkListController::changPhone($row[3]), 
        ]);
    }
}
