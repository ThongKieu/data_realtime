<?php

namespace App\Http\Controllers;

use App\Imports\OldCusImport;
use Illuminate\Http\Request;
// use Maatwebsite\Excel\Excel;

class OldCustomerController extends Controller
{
    //
    public function importDataCustomer(Request $request) {
            $imported = Excel::import( new OldCusImport, $request->file);
            if($imported)
            {
                return 'Ok';
            }
            else
                return 'Failed';
    }
}
