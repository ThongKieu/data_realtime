<?php

namespace App\Http\Controllers\Api;
use App\Http\Controllers\Controller;
use App\Imports\WorkerImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class WorkerController extends Controller
{
    public function importDataWorker(Request $request) {
        $imported = Excel::import(new WorkerImport(), $request->file);
        if($imported)
        {
            return 'Ok';
        }
        else 
            return 'Failed';
}
}
