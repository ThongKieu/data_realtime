<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OldCustomer;
use Illuminate\Http\Request;

use Maatwebsite\Excel\Facades\Excel;

class OldCustomersController extends Controller
{
    //
    public function importCus(Request $request) {
            $a = Excel::import( new OldCustomer(), $request->file);
            if($a)
            {
                return 'ok';
            }
            else 
                return 'Fails';
    }
}

