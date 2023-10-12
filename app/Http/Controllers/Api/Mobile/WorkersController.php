<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\AccountionWorkerController;
use App\Http\Controllers\Controller;
use App\Models\AccountionWorker;
use App\Models\Worker;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WorkersController extends Controller
{
    //
    public function __invoke()
    {
    }
    public function index()
    {
        $workers =Worker::all();
        foreach($workers as $worker)
        {
            $now = Carbon::now()->tz('Asia/Ho_Chi_Minh');
            $last_active = AccountionWorker::where('id_worker','=',$worker->id)->value('last_active');
            $startTime = Carbon::create($last_active);
            $diff = $startTime->diff($now);
            $worker->last_active = $diff;
        }
        return response()->json($workers);
    }
    public function store(Request $request)
    {

        $sort = WorkersController::getSortName($request->kind_worker);

        if ($request->hasFile('avatar_new')) {
            $file = $request->file('avatar_new');
            $name = $sort . '.' . $file->extension();
            $file->move('assets/avatar/', $name);
            $path = 'assets/avatar/'.$name;
        }
        else
        {
            $path = 'assets/avatar/avata1.png';
        }
        $new = new Worker([
            'worker_firstname' => $request->worker_firstname,
            'worker_name' => $request->worker_name,
            'sort_name' => $sort,
            'add_worker' => $request->add_worker,
            'phone_ct' => $request->phone_cty,
            'phone_cn' => $request->phone_cn,
            'folder_path' => 'assets/images/work/' . $sort,
            'kind_worker' => $request->kind_worker,
            'avatar' => $path,
        ]);
        $new->save();
        $id = Worker::where('sort_name','=',$sort)->value('id');
        $createAcc = AccountionWorkerController::createAcc($id, $sort,$request->phone_cty);
        if($createAcc != 1)
        {
            return response()->json('Tạo Tài Khoản Không Thành Công');
        }
        return response()->json('Worker create');
    }
    public static function getSortName($kind_worker)
    {
        $num = Worker::where('kind_worker', '=', $kind_worker)->get('id');
        $num_of_kind = count($num);
        $num_of_kind += 1;
        $p = substr(sprintf('%02d',  $num_of_kind), 0, 8);
        switch ($kind_worker) {
            case 0:
                $sort = 'A' . $p;
                return  $sort;
            case 1:
                $sort = 'B' . $p;
                return  $sort;
            case 2:

                $sort = 'C' . $p;
                return  $sort;
            case 3:
                $sort = 'D' . $p;
                return  $sort;
            case 4:
                $sort = 'F' . $p;
                return  $sort;
            case 5:
                $sort = 'G' . $p;
                return  $sort;
            case 6:
                $sort = 'H' . $p;
                return  $sort;
            default:
                $sort = 0;
                return $sort;
        }
        // return $p = substr(sprintf('%02d', '9'),0,8);
    }
    public function addAvatar(Request $req)
    {
        if ($req->hasFile('avatar_new')) {
            $file = $req->file('avatar_new');
            $name = $req->sort_name . '.' . $file->extension();
            $file->move('assets/avatar/', $name);
            $up = Worker::where('sort_name', '=', $req->sort_name)->update(['avatar' => $file]);

            if ($up) {
                return 'Update Done!';
            } else {
                return 'Failse Update';
            }
        }
    }
    public function updateWorker(Request $re)
    {
        $action = $re->action;
        //    dd($re->all());
        switch ($action) {
            case 'status_change_worker':
                // dd($re->id);
                Worker::where('id', '=', $re->id)->update(['status_worker' => $re->status]);
                return response()->json(['data' => 'Change Status']);
            case 'avatar_change_worker':
                if ($re->hasFile('avatar_new')) {

                    $file = $re->file('avatar_new');
                    $name = $re->sort_name . '-' . time() . '.' . $file->extension();
                    $file->move('assets/avatar/', $name);
                    $path = 'assets/avatar/'.$name;
                    $up = Worker::where('sort_name', '=', $re->sort_name)->update(['avatar' => $path]);
                }
                return response()->json(['data' => 'Change Avatar']);
            case 'phone_change_worker':
                Worker::where('id', '=', $re->id)->update(['phone_ct' => $re->phone_ct]);
                return response()->json(['data' => 'Change Phone']);
            default:
                return response()->json(['data' => 'Lỗi cập nhật']);
        }
    }

}
