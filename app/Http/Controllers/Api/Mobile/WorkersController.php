<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\AccountionWorkerController;
use App\Http\Controllers\Controller;
use App\Models\AccountionWorker;
use App\Models\User;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WorkersController extends Controller
{
    //
    public function __invoke()
    {
    }

    public function test()
    {
        $test = User::all();
        return $test;
    }

    public function index()
    {
        $workers = Worker::where('worker_kind', '!=', 9)->get(['id', 'worker_phone_company', 'worker_code', 'worker_full_name', 'worker_status', 'worker_address', 'worker_avatar', 'worker_phone_family']);
        foreach ($workers as $worker) {
            $now = Carbon::now()->tz('Asia/Ho_Chi_Minh');
            $last_active = AccountionWorker::where('id_worker', '=', $worker->id)->value('last_active');
            $startTime = Carbon::create($last_active);
            $diff = $startTime->diff($now);
            $worker->last_active = $diff;
        }
        return response()->json($workers);
    }
    public function store(Request $request)
    {

        $sort = WorkersController::getSortName($request->worker_kind);

        if ($request->hasFile('avatar_new')) {
            $file = $request->file('avatar_new');
            $name = $sort . '.' . $file->extension();
            $file->move('assets/avatar/', $name);
            $path = 'assets/avatar/' . $name;
        } else {
            $path = 'assets/avatar/avata1.png';
        }
        $new = new Worker([
            'worker_full_name' => $request->worker_full_name,
            'worker_name' => $request->worker_name,
            'sort_name' => $sort,
            'add_worker' => $request->add_worker,
            'phone_ct' => $request->phone_cty,
            'phone_cn' => $request->phone_cn,
            'folder_path' => 'assets/images/work/' . $sort,
            'worker_kind' => $request->worker_kind,
            'avatar' => $path,
        ]);
        $new->save();
        $id = Worker::where('sort_name', '=', $sort)->value('id');
        $createAcc = AccountionWorkerController::createAcc($id, $sort, $request->phone_cty);
        if ($createAcc != 1) {
            return response()->json('Tạo Tài Khoản Không Thành Công');
        }
        return response()->json('Worker create');
    }
    public static function getSortName($worker_kind)
    {
        $num = Worker::where('worker_kind', '=', $worker_kind)->get('id');
        $num_of_kind = count($num);
        $num_of_kind += 1;
        $p = substr(sprintf('%02d', $num_of_kind), 0, 8);
        switch ($worker_kind) {
            case 0:
                $sort = 'A' . $p;
                return $sort;
            case 1:
                $sort = 'B' . $p;
                return $sort;
            case 2:

                $sort = 'C' . $p;
                return $sort;
            case 3:
                $sort = 'D' . $p;
                return $sort;
            case 4:
                $sort = 'F' . $p;
                return $sort;
            case 5:
                $sort = 'G' . $p;
                return $sort;
            case 6:
                $sort = 'H' . $p;
                return $sort;
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
                    $path = 'assets/avatar/' . $name;
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

    public static function getTokenFCM($id)
    {
        $token_fcm = DB::table('accountion_workers')->where('id_worker', '=', $id)->value('FCM_token');
        return $token_fcm;
    }
    // sen to app noti push
    public function sentNewWorkToWorker(Request $request)
    {
        $info_noti = 'Có Lịch Mới';
        // $token_fcm = $request->fcmCode;
        $token_fcm = WorkersController::getTokenFCM($request->idWorker);
        // $token_fcm = 'fQ2iDcPATViekk78eM5VXG:APA91bH7AKykxHmoEMc9KCBvNHyy_RQISCPwUzZ0vv7H9baf2257iAxFaSS0GXQmy-Ir99X99zPcx-NFLMvZnOgEh0XBSIDQlz5WRLFods9xhvwN3p5Xm5E3xIsOEi6HyOq_a_l4HbrH';

        if ($token_fcm != null) {
            $server_key = 'AAAAzktash8:APA91bH2SrLRRWV9l7sstzc5hHgepzLUX7iDtl4gqAx-jEYb8mYb7Gz7e-XsxVpTL6dVj4-3-BemdR-JE56fo1XDcwY-f5zjaA2JtH-5E-7YlKfpzNVpAl9ngpnw8VPCUOSXxu1v8V13';
            $h = array(
                "title" => "Công ty Thợ Việt",
                "body" => $info_noti,
                "sound" => "default",
                "android_channel_id" => "thovietworker",

            );
            $data = array(
                "to" => $token_fcm,
                "notification" => $h,
                "priority" => "high",
            );
            $url = 'https://fcm.googleapis.com/fcm/send';
            $encodeData = json_encode($data);
            $headers = [
                'Authorization:key=' . $server_key,
                'Content-Type: application/json',
            ];
            // dd($encodeData);
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
            curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
            // Disabling SSL Certificate support temporarly
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $encodeData);
            // Execute post
            $result = curl_exec($ch);
            // dd($result);
            if ($result === false) {
                die('Curl failed: ' . curl_error($ch));
            }
            // Close connection
            curl_close($ch);
            // FCM response
        } else {
            return 'FCM Token Null';
        }

    }
    // Công việc trả xuống app
    public function getWork(Request $request)
    {
        // dd($request->all());
        if ($request->date_work) {
            if ($request->id) {
                $work_assigment = WorksAssignment::where('created_at', 'like', $request->date_work . '%')->where('id_worker', '=', $request->id)->whereBetween('status_work', [0, 3])->get(['id', 'id_cus', 'id_phu']);
                $data = [];
                foreach ($work_assigment as $item) {

                    $cus = Work::where('id', '=', $item->id_cus)->get(["work_content", "name_cus",
                        "date_book",
                        "work_note",
                        "street",
                        "district",
                        "phone_number",
                        "image_work_path"]);
                    $json_data = [
                        'id' => $item->id,
                    ];
                    if ($item->phu != 0) {
                        $phu = Worker::where('id', '=', $item->id_phu)->get(['worker_full_name', 'worker_phone_company']);
                        $data['id_phu'] = $phu;
                    }
                }
                return response()->json($data);
            }
            return response()->json('Request Fail, No ID!');
        }
        return response()->json('Request Fail, No date!');

    }

    public function getAllWorks(Request $request)
    {
        $id = $request->id_worker;
        $date = $request->date;
        // $date =date('Y-m-d');
        $date = $date . "%";
        $findWork = DB::table('works_assignments')
            ->leftJoin('works', 'works.id', '=', 'works_assignments.id_cus')
            ->leftJoin('workers', 'workers.id', '=', 'works_assignments.id_worker')
            ->where('works_assignments.updated_at', 'like', $date)
            ->where('works_assignments.id_worker', '=', $id)
            ->where('works_assignments.status_work', '=', 0)
            ->orderByDesc('id')
            ->limit(100)
            ->get(['works_assignments.id', 'works_assignments.id_cus', 'works.name_cus', 'works.work_content', 'works.date_book', 'works.street', 'works.district', 'works.phone_number', 'works_assignments.real_note', 'works_assignments.status_work', 'works_assignments.check_in']);
        return $findWork;
        // return $date;
    }
    public function cancelWork(Request $request)
    {
        $id_work_assignments = $request->id_work_assignments;
        $id_worker = $request->id_worker;
        $id_cus = $request->id_cus;
        if ($id_work_has && $id_worker) {
            $f = DB::table('works_assignments')->where('id', '=', $id_work_assignments)->where('id_worker', '=', $id_worker)->get('id_cus');
            if ($f != null) {
                $update_assignments = DB::table('works_assignments')->where('id', '=', $id_work_assignments)->update(['status_work' => 5, 'real_note' => $request->get('real_note')]);
                $update_cus = DB::table('works')->where('id', '=', $id_cus)->update(['status_cus' => 0, 'work_note' => $request->get('real_note')]);
                return 1;
            } else {
                return 2;
            }
        } else {
            return 3;
        }

    }

}
