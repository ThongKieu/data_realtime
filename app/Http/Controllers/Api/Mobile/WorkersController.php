<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\AccountionWorkerController;
use App\Http\Controllers\Api\WorksAssignmentController;
use App\Http\Controllers\Controller;
use App\Models\AccountionWorker;
use App\Models\User;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Carbon\Carbon;
use Google\Client as GoogleClient;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

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
            $name = $req->id_worker . '.' . $file->extension();
            $file->move('assets/avatar/', $name);
            $up = AccountionWorker::where('id_worker', '=', $req->id_worker)->update(['avatar' => $file]);

            if ($up) {
                return 'Update Done!';
            } else {
                return 'Failse Update!';
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
                Worker::where('id', '=', $re->id)->update(['worker_status' => $re->status]);
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
            // Thong them doan nay
            case 'phone_change_worker_daily_sales':
                Worker::where('id', '=', $re->id)->update(['worker_daily_sales' => $re->worker_daily_sales]);
                return response()->json(['data' => 'Change worker_daily_sales']);
            default:
                return response()->json(['data' => 'Lỗi cập nhật']);
        }
    }

    public static function getTokenFCM($id)
    {
        $token_fcm = DB::table('accountion_workers')->where('id_worker', '=', $id)->value('FCM_token');
        return $token_fcm;
    }
    // Send FCM
    public function sendFCM(Request $request)
    {

        $fcm_token = WorkersController::getTokenFCM($request->idWorker);

        $title = "Thợ Việt";
        $description = "Có lịch mới, gọi khách nha !!";

        $credentialsFilePath = "json/appthoviet-93570f1992e9.json"; // in local
        // $credentialsFilePath = Http::get(asset('json/file.json')); // in server
        $client = new GoogleClient();
        $client->setAuthConfig($credentialsFilePath);
        $client->addScope('https://www.googleapis.com/auth/firebase.messaging');
        $client->refreshTokenWithAssertion();
        $token = $client->getAccessToken();

        $access_token = $token['access_token'];

        $headers = [
            "Authorization: Bearer $access_token",
            'Content-Type: application/json; charset=UTF-8',
        ];

        $data = [
            "message" => [
                "token" => $fcm_token,
                "notification" => [
                    "title" => $title,
                    "body" => $description,

                ],
                "android" => [
                    "notification" => [
                        "channel_id" => "thovietworker",
                        "sound" => "notification",
                    ],
                ],
                "apns" => [
                    "payload" => [
                        "aps" => [
                            "sound" => "notification.mp3",
                        ],
                    ],
                ],
            ],
        ];

        $payload = json_encode($data);

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/v1/projects/appthoviet/messages:send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_VERBOSE, true); // Enable verbose output for debugging
        $response = curl_exec($ch);
        $err = curl_error($ch);
        curl_close($ch);

        if ($err) {
            return response()->json([
                'message' => 'Error: ' . $err,
            ], 500);
        } else {
            return response()->json([
                'message' => 'Success: Notification has been sent !!',
                'response' => json_decode($response, true),
            ]);
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
            ->get(['works_assignments.id', 'works_assignments.id_cus', 'works.name_cus', 'works.work_content', 'works.date_book', 'works.street', 'works.district', 'works.phone_number', 'works.image_work_path', 'works_assignments.real_note', 'works_assignments.status_work', 'works_assignments.check_in']);
        return $findWork;
        // return $date;
    }
    public function changePasswordWorker(Request $request)
    {
        $id = $request->id;
        if ($id != null) {
            $password = Hash::make($request->password);
            $update = DB::table('accountion_workers')->where('id_worker', '=', $id)->update(['pass_worker' => $password, 'last_active' => now()]);
            if ($update) {
                return 'true';
            } else {
                return 'failed';
            }
        } else {
            return 'failed';
        }
    }
    public function getNameCodeWorker(Request $request)
    {
        $nameCodeWorker = DB::table('workers')->get(['worker_code', 'worker_full_name']);
        return $nameCodeWorker;
    }
    public function checkActiveWorker(Request $req)
    {

        $keay = $req->device_key;
        $check = AccountionWorker::where('id_worker', '=', $req->id)->get(['active', 'device_key']);
        // return $check;
        if ($check != null) {
            foreach ($check as $item) {
                $active = $item->active;
                $device = $item->device_key;
                // return $device;
                switch ($active) {
                    //chưa kích hoạt
                    case 0:
                        return 0;
                        break;
                    //đã kích hoạt
                    case 1:
                        if ($device == $req->device_key) {
                            return 1;
                        } else {
                            AccountionWorker::where('id_worker', '=', $req->id)->update(['active' => 2, 'device_key' => $req->device_key, 'FCM_token' => $req->fcm_token]);
                            return 2;
                        }
                        break;
                    //tạm giữ
                    case 2:
                        return 2;
                        break;
                    //Đã xóa tài khoản
                    case 3:
                        return 3;
                        break;
                }
            }
        } else {
            return 0;
        }

    }
    public function historyWork(Request $request)
    {
        $id = $request->id_worker;
        $history = DB::table('works_assignments')
            ->leftJoin('works', 'works.id', '=', 'works_assignments.id_cus')
            ->leftJoin('workers', 'workers.id', '=', 'works_assignments.id_worker')
            ->where('works_assignments.id_worker', '=', $id)
            ->where('works_assignments.status_work', '!=', '5')
            ->orderByDesc('works_assignments.id')
            ->limit(100)
            ->get(['works_assignments.id', 'works_assignments.id_cus', 'works.name_cus', 'works.work_content', 'works.date_book', 'works.street', 'works.district', 'works.phone_number', 'works_assignments.income_total', 'works_assignments.spending_total', 'works_assignments.status_work']);
        if (count($history) > 0) {
            foreach ($history as $item) {
                $warranty = WorksAssignmentController::getWarrantiesById($item->id);
                $item->warranty = $warranty;
            }
        }
        return $history;
    }
    public function infoWorkerToApp(Request $request)
    {
        // Yêu cầu cung cấp ID Thợ
        $info_worker = Worker::where('id', '=', $request->id)->get(['worker_full_name', 'worker_code', 'worker_phone_personal', 'worker_phone_company', 'worker_avatar', 'worker_daily_sales', 'worker_daily_o_t_by_hour']);

        if ($info_worker) {
            return response()->json($info_worker);
        } else {
            return 'Chek Info Sent';
        }

    }
    public function updateInfoWorkerToApp(Request $request)
    {

        $update_info = Worker::where('id', '=', $request->id)->update([
            'worker_full_name' => $request->worker_full_name, 'worker_phone_personal' => $request->worker_phone_personal,
        ]);

        if ($update_info) {
            return response()->json($update_info);
        } else {
            return 'Chek Info Sent';
        }

    }
}
