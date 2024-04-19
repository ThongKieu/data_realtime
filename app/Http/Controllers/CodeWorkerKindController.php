<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CodeWorkerKindController extends Controller
{
    //
    public function store(Request $re) {  
        
       

        return response()->json($re->all());
    }

    public function checkCode(Request $re) {
        
        return $re->all();
    }
}
