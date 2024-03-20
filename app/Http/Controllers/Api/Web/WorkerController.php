<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Api\MapsWorkerController;
use App\Http\Controllers\Controller;
use App\Imports\WorkerImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Worker;
use App\Models\AccountionWorker;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;

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
        $workers = Worker::where('worker_kind', '!=', 9)->get(['id', 'worker_phone_company', 'worker_code', 'worker_full_name', 'worker_status', 'worker_address', 'worker_avatar', 'worker_phone_personal','worker_check_acc']);
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
    public function updateWorker(Request $re)
    {
        $action = $re->action;
        //    dd($re->all());
        switch ($action) {
            case 'status_change_worker':
                // dd($re->id);
                Worker::where('id', '=', $re->id)->update(['worker_status' => $re->status]);
                if($re->status == 2)
                {
                    MapsWorkerController::updateDismissal($re->id);
                }
                return response()->json('Change Status');
            case 'avatar_change_worker':
                if ($re->hasFile('avatar_new')) {
                    $file = $re->file('avatar_new');
                    $name = $re->worker_code . '-' . time() . '.' . $file->extension();
                    $file->move('assets/avatar/', $name);
                    $path = 'assets/avatar/' . $name;
                    $up = Worker::where('worker_code', '=', $re->worker_code)->update(['worker_avatar' => $path]);
                }
                return response()->json(['data' => 'Change Avatar']);
            case 'phone_change_worker':
                Worker::where('id', '=', $re->id)->update(['worker_phone_company' => $re->phone_ct]);
                return response()->json(['data' => 'Change Phone']);
            default:
                return response()->json(['data' => 'Lỗi cập nhật']);
        }
    }

   public function addNewWorker(Request $request){

    $r_last_num = WorkerController::findCodeWorker($request->worker_kind);
    // dd($r_last_num);

    if($r_last_num != ''|| $r_last_num != null)
    {
        $next_worker_code = substr($r_last_num, 1)+1;
    }
    else
    {
        return response()->json('Check infomation!!!!');
    }
    if($next_worker_code < 10)
    {
        $paddedNumber = str_pad($next_worker_code, 2, '0', STR_PAD_LEFT);
    }
    else{
        $paddedNumber = $next_worker_code;
    }

        switch($request->worker_kind)
            {
                case 0:
                    $next_worker_code = 'A'. $paddedNumber;
                    break;
                case 1:
                    $next_worker_code = 'B'. $paddedNumber;
                    break;
                case 2:
                    $next_worker_code = 'C'. $paddedNumber;
                    break;
                case 3:
                    $next_worker_code = 'D'. $paddedNumber;
                    break;
                case 4:
                    $next_worker_code = 'F'. $paddedNumber;
                    break;
                case 6:
                    $next_worker_code = 'H'. $paddedNumber;
                    break;
                case 5:
                    $next_worker_code = 'G'. $paddedNumber;
                    break;
                default:
                    $next_worker_code = '121';
                    return $next_worker_code;
            }

    $da = new Worker([
        "worker_full_name" => $request->worker_full_name,
        "worker_kind" => $request->worker_kind,
        "worker_phone_company" =>$request->worker_phone_company,
        "worker_phone_personal" => $request->worker_phone_personal,
        "worker_code"=>$next_worker_code,
        'worker_address'=>$request->worker_address,
        "worker_path"=>'assets/worker/' . $next_worker_code,
    ]);
    $da->save();
    if($da)
        if ($request->hasFile('avatar_new')) {
            $file = $request->file('avatar_new');
            $name = $next_worker_code . '-' . time() . '.' . $file->extension();
            $file->move('assets/avatar/', $name);
            $path = 'assets/avatar/' . $name;
            $up = Worker::where('worker_code', '=', $next_worker_code)->update(['worker_avatar' => $path]);

        }
        else
        {
            $path = 'assets/avatar/avata1.png';
        }
        $id_worker = Worker::where('worker_code', '=', $next_worker_code)->value('id');
        $acc = $next_worker_code.$request->worker_phone_company;

        $all = WorkerController::createAcc($id_worker,$acc,'Thoviet58568',$path);
        // dd($all);
        if($all)
        {
            $data = ['acc'=>$acc,'pass'=>'Thoviet58568'];
            $up = Worker::where('worker_code', '=', $next_worker_code)->update(['worker_check_acc' => 1]);
            return response() ->json($data);
        }
        else
        {
            return 'Error Check Again';
        }

   }
    public function findCodeWorker($worker_kind) {
        $r_last_num = Worker::where('worker_kind','=',$worker_kind)->orderBy('id','desc')->value('worker_code');
        return $r_last_num;
    }
    public function createAcc($id_worker,$acc_worker,$pass_worker,$avatar)  {
        $n_acc = new AccountionWorker([
            'id_worker'=>$id_worker,'acc_worker'=>$acc_worker,'pass_worker'=>Hash::make($pass_worker),'avatar'=>$avatar
        ]);
        $n_acc->save();
        return $n_acc;
    }
    public function createAccFromTab(Request $re)  {
        // dd($re->all());
        $n_acc = new AccountionWorker([
            'id_worker'=>$re->id_worker,'acc_worker'=>$re->acc_worker,'pass_worker'=>Hash::make($re->pass_worker),'avatar'=>$re->avatar
        ]);
        $n_acc->save();

        return $n_acc;

    }
}
