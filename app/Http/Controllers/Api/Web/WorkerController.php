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
    public function getWorkerWithType()
    {
        $workerDN = Worker::where('worker_kind', '=', 1)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code']);
        $workerXD = Worker::where('worker_kind', '=', 2)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code']);
        $workerDL = Worker::where('worker_kind', '=', 3)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code']);
        $workerDG = Worker::where('worker_kind', '=', 4)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code']);
        $workerHX = Worker::where('worker_kind', '=', 5)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code']);
        $workers = [
            'workerDN' => $workerDN,
            'workerXD' => $workerXD,
            'workerDL' => $workerDL,
            'workerDG' => $workerDG,
            'workerHX' => $workerHX,
        ];

        return response()->json($workers);
    }
}
