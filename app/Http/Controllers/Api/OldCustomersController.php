<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\CustomerImport;
use Illuminate\Http\Request;

use Maatwebsite\Excel\Facades\Excel;

class OldCustomersController extends Controller
{
    //
    public function importDataCustomer(Request $request) {
            $imported = Excel::import(new CustomerImport(), $request->file);
            if($imported)
            {
                return 'Ok';
            }
            else 
                return 'Failed';
    }
}

