<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ViewSale;

class ViewSaleController extends Controller
{
    public function getAllPopupDiscount()
    {
      $data = ViewSale::where('flag','=','1')->get();
       return $data;
    }
}
