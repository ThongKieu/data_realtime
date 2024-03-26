<?php

namespace App\Imports;

use App\Models\PriceList;
use Maatwebsite\Excel\Concerns\ToModel;

class PriceListImport implements ToModel
{
    /**
    * @param Collection $collection
    */
    public function model(array $row)
    {
        return new PriceList([
            'ID_price_list' => $row[0],
            'name_price_list' => $row[1],
            'info_price' => $row[2],
            'price' => $row[3],
            'image_price' => $row[4],
            'note_price' => $row[5],
        ]);
    }
}
