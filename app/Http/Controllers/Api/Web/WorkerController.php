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
        return response()->json(Worker::where('id','>',0));
    }
    public function getWorkerWithType()
    {
        $workerDN = Worker::where('worker_kind', '=', 0)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district']);
        $workerDL = Worker::where('worker_kind', '=', 1)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district']);
        $workerDG = Worker::where('worker_kind', '=', 2)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district']);
        $workerXD = Worker::where('worker_kind', '=', 4)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district']);
        $workerHX = Worker::where('worker_kind', '=', 6)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district']);
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
