<?php

namespace App\Http\Controllers;

use App\Imports\OldCusImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Excel;

class OldCustomerController extends Controller
{
    //
    public function inportCus(Request $request) {
            $a = Excel::import( new OldCusImport, $request->file);
            if($a)
            {
                return 'ok';
            }
            else 
                return 'Fails';
    }
}
