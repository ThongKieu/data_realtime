<?php

namespace App\Http\Controllers;

use App\Models\AccountionWorker;
use App\Models\Worker;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AccountionWorkerController extends Controller
{
    public function index()
    {
        $data = AccountionWorker::all();
        return response()->json($data);
    }
    public static function createAcc($id, $sort_name, $phone_ct)
    {
        $acc = $sort_name . $phone_ct;
        $newAcc = new AccountionWorker([
            'id_worker' => $id,
            'acc_worker' => $acc,
            'pass_worker' => Hash::make('thoviet2011'),
        ]);
        $newAcc->save();

        if ($newAcc) {
            return 1;
        } else {
            return 'Không thành công';
        }
    }
    public static function getAllWorkersAcctive()
    {

        // dd('1111111111111');
        // $all = AccountionWorker::all();
        $all = DB::table('accountion_workers')
            ->leftJoin('workers', 'accountion_workers.id_worker', 'workers.id')
            ->where('workers.worker_check_acc', '!=', 0)
            ->get([
                'worker_full_name',
                'acc_worker',
                'last_active',
                'device_key',
                'time_log',
                'avatar',
                'active',
                'worker_code',
            ]);



        return $all;
    }
    // trả về thông tin tên thợ
    public static function getNameWorkerAcctive($id)
    {

        $nameWork = DB::table('workers')->where('id', '=', $id)->get(['worker_full_name']);
        $a = '';
        foreach ($nameWork as $item) {
            $a = $item->worker_full_name;
        }
        if ($a != null) {
            return $a;
        } else {
            return 'Không Tìm Đươc';
        }
    }
    public function checkAccWorker(Request $req, $id)
    {

        $keay = $req->device_key;
        $check = AccountionWorker::where('id_worker', '=', $id)->get(['active', 'device_key']);
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
                            AccountionWorker::where('id_worker', '=', $id)->update(['active' => 2, 'device_key' => $req->device_key, 'FCM_token' => $req->fcm_token]);
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
    public static function checkAccWorkerWeb($id)
    {

        $check = AccountionWorker::where('id_worker', '=', $id)->get(['active', 'device_key']);
        // return $check;
        if ($check != null) {
            foreach ($check as $item) {
                $active = $item->active;

                // return $device;
                switch ($active) {
                        //chưa kích hoạt
                    case 0:
                        return 0;
                        break;
                        //đã kích hoạt
                    case 1:
                        return 1;
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
    public function updateActive(Request $request)
    {
        $id = $request->id;
        $ac = $request->action;
        //  dd($id);
        switch ($ac) {
            case 1:
                DB::update('update account_workers set active =' . $ac . ' where id = ?', [$id]);
                break;
            case 2:
                DB::update('update account_workers set active =' . $ac . ' where id = ?', [$id]);
                break;
            case 3:
                DB::update('update account_workers set active =' . $ac . ' where id = ?', [$id]);
                break;
        }
        return response()->json('Change Status Done!');
    }

    public function checkDeviceKey($key, $id)
    {
        $a = AccountionWorker::where('acc_worker', '=', $id)->value('device_key');
        if ($a) {
            if ($a == $key) {
                return 1; // đăng nhập lại trên thiết bị
            } else {
                AccountionWorker::where('acc_worker', '=', $id)->update(['active' => 0]);
                return 2; // Đăng nhập bằng 1 thiết bị khác - Vui lòng thông báo admin để mở khóa thiết bị mới của bạn
            }
        } else {
            return 3;
        }
        //Key null lần đầu đang nhập
    }
    // check time login wrong
    public function checkWrongLogin($time)
    {
        if ($time < 2) {
            return 1;
        } else {
            return 0;
        }
    }

    //LOGIN APP--------------------------------Witch check wrong
    public function login(Request $request)
    {
        $acc_worker = $request->acc_worker;
        $pass_worker = $request->pass_worker;
        $device_key = $request->device_key;
        $check = AccountionWorker::where('acc_worker', '=', $acc_worker)->get();
        // $checkwrong = 0;
        if ($check->count() == 1) {
            foreach ($check as $item) {
                $timewrong = AccountionWorkerController::checkWrongLogin($item->time_log);
                // return $item->time_log;
                if ($timewrong == 1) {
                    if (Hash::check($pass_worker, $item->pass_worker)) {

                        $a[0] = 0;
                        $a[1] = $item->id_worker;
                        $a[2] = AccountionWorkerController::checkDeviceKey($device_key, $acc_worker);
                        $info = Worker::where('id', '=', $item->id_worker)->get();
                        foreach ($info as $i) {
                            $a[3] = $i->worker_full_name;
                            $a[4] = $i->worker_code;
                            $a[5] = $i->worker_phone_personal;
                            $a[6] = $i->worker_phone_company;
                        }
                        $a[7] = $device_key;
                        AccountionWorker::where('acc_worker', '=', $acc_worker)->update(['time_log' => '0', 'device_key' => $device_key, 'FCM_token' => $request->fcm_token, 'last_active' => date('y-m-d H:i:s')]);
                        return $a;
                    } else {
                        $item->time_log += 1;
                        // AccountWorkers::where('acc_worker','=',$acc_worker)-> update(['time_log'=>$item->time_log,'device_key'=>$device_key]);
                        $b[0] = 1;
                        $b[1] = $item->time_log;
                        $b[2] = AccountionWorkerController::checkDeviceKey($device_key, $acc_worker);
                        AccountionWorker::where('acc_worker', '=', $acc_worker)->update(['time_log' => $item->time_log, 'device_key' => $device_key]);

                        // đã đăng nhập sai bao nhiêu lần = checkWrong
                        return $b;
                    }
                } else
                // Tài khoản đã đang nhập sai quá 3 lần vui lòng liên hệ ADMIN
                {
                    AccountionWorker::where('acc_worker', '=', $acc_worker)->update(['active' => '0']);
                    $c[0] = 2;

                    return $c;
                }
            }
        } else {
            // Tài khoản chưa được đăng ký hoặc chưa được kích hoạt vui lòng lòng liên hệ ADMIN
            {
                $d[0] = 3;
                return $d;
            }
        }
    }
    //app update
    public function changeAppSetting(Request $request)
    {
        $id_worker = $request->id;

        if ($id_worker != null) {
            $pa = Hash::make($request->pass_worker);
            $u = DB::table('account_workers')->where('id_worker', '=', $id_worker)->update(['pass_worker' => $pa, 'last_active' => now()]);
            return 1;
        } else {
            return 0;
        }
    }

    //admin update
    public function changePass(Request $request)
    {
        $ac = $request->ac;
        $id = $request->id;
        //    dd($ac);
        if ($ac == 0) {
            $id = $request->id;
            $newPass = Hash::make($request->pass_worker);
            $u = DB::table('account_workers')->where('id', '=', $id)->update(['pass_worker' => $newPass]);
            return response()->json('Vui lòng đăng nhập lại');
        } else if ($ac != 0) {
            if ($ac == 1) {
                $newAcc = $request->acc_worker;
                $u = DB::table('account_workers')->where('id', '=', $id)->update(['acc_worker' => $newAcc]);
                return response()->json($newAcc);
            } else {
                $length = 10; // Độ dài chuỗi mong muốn
                $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                $randomString = substr(str_shuffle($characters), 0, $length);
                $u = DB::table('account_workers')->where('id', '=', $id)->update(['pass_worker' => $randomString]);
                if($u){return response()->json($randomString);}
                else{return response()->json('Fail!');}
            }
        }
        return response()->json('Vui lòng cung cấp thông tin');
    }
}
