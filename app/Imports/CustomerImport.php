<?php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\OldCustomer;
class CustomerImport implements ToModel
{
    public function model(array $row)
    {
        return new OldCustomer([
            'work_content' => $row[0],
            'date_book' => $row[1],
            'warranty_period' => $row[2],
            'name_cus' => $row[3],
            'add_cus' => $row[4],
            'des_cus' => $row[5],
            'phone_cus' => $row[6],
            'note_cus' => $row[7],
            'sort_name' => $row[8],
            'worker_name' => $row[9],
            'spending_total' => $row[10],
            'income_total' => $row[11],
            'seri_number' => $row[12],
            'cus_show' => $row[13],
			'seri_number_check' => $row[14],
			'code_work' => $row[15],
        ]);
    }
}
