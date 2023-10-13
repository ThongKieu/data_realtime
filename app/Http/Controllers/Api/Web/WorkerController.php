<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Imports\WorkerImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Worker;

class WorkerController extends Controller
{
    public function importDataWorker(Request $request)
    {
        $imported = Excel::import(new WorkerImport(), $request->file);
        if ($imported) {
            return 'Ok';
        } else {
            return 'Failed';
        }

    }
    public function getAllWorkers()
    {
        $worker = Worker::all();
        return $worker;
    }
}
