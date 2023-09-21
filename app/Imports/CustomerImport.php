<?php

namespace App\Imports;

use App\Models\OldCustomer;
use Illuminate\Support\Collection;
use Maatwebsite\Excel\Concerns\ToCollection;

class CustomerImport implements ToCollection
{
    /**
    * @param Collection $collection
    */
    public function collection(Collection $collection)
    {
        return new OldCustomer([
            'work_content' => $collection[0],
            'date_book' => $collection[1],
            'warranty_period' => $collection[2],
            'name_cus' => $collection[3],
            'add_cus' => $collection[4],
            'des_cus' => $collection[5],
            'phone_cus' => $collection[6],
            'note_cus' => $collection[7],
            'sort_name' => $collection[8],
            'worker_name' => $collection[9],
            'spending_total' => $collection[10],
            'income_total' => $collection[11],
            'seri_number' => $collection[12],
            'cus_show' => $collection[13],
			'seri_number_check' => $collection[14],
			'code_work' => $collection[15],
        ]);
    }
}
