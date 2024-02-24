<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Imports\WorkerImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Worker;
use App\Models\AccountionWorker;
use Carbon\Carbon;
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
        $workers = Worker::where('worker_kind', '!=', 9)->get(['id', 'worker_phone_company', 'worker_code', 'worker_full_name', 'worker_status', 'worker_address', 'worker_avatar', 'worker_phone_family']);
        $now = Carbon::now()->tz('Asia/Ho_Chi_Minh');
        foreach ($workers as $worker) {
            $last_active = AccountionWorker::where('id_worker', '=', $worker->id)->value('last_active');
            $startTime = Carbon::create($last_active);
            $diff = $startTime->diff($now);
            $worker->last_active = $diff;
        }
        return response()->json($workers);
    }
    public function getWorkerWithType()
    {
        $workerDN = Worker::where('worker_kind', '=', 0)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district', 'worker_status']);
        $workerDL = Worker::where('worker_kind', '=', 1)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district', 'worker_status']);
        $workerDG = Worker::where('worker_kind', '=', 2)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district', 'worker_status']);
        $workerXD = Worker::where('worker_kind', '=', 4)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district', 'worker_status']);
        $workerHX = Worker::where('worker_kind', '=', 6)->orderBy('worker_code', 'asc')->get(['id', 'worker_full_name', 'worker_code', 'worker_district', 'worker_status']);
        $workers = [
            'workerDN' => $workerDN,
            'workerXD' => $workerXD,
            'workerDL' => $workerDL,
            'workerDG' => $workerDG,
            'workerHX' => $workerHX,
        ];

        return response()->json($workers);
    }
    public function returnName()
    {

    }
}
