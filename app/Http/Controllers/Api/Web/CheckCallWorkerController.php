<?php

namespace App\Http\Controllers\Api\Web;

use App\Imports\ImportCheckCallWorker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\CheckCallWorker;

class CheckCallWorkerController extends Controller
{
    public function importDataCheckCallWorker(Request $request)
    {
        $imported = Excel::import(new ImportCheckCallWorker(), $request->file);
        if ($imported) {
            return 'Ok';
        } else {
            return 'Failed';
        }

    }
    public function getAllCheckCallWorkers(Request $request)
    {
        $worker = CheckCallWorker::all();
        return $worker;
    }
}
