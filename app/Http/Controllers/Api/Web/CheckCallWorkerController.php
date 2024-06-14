<?php

namespace App\Http\Controllers\Api\Web;

use App\Imports\ImportCheckCallWorker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\CheckCallWorker;
use App\Models\OldCustomer;
use Illuminate\Support\Facades\DB;

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
        // $month = $request->this_month;
        $date_get = '%' . $request->this_month . '/' . $request->this_year;

        if ($request->this_year && $request->this_month && $request->phone == null) {
            // dd($date_get);
            $rturn_call = CheckCallWorker::where('worker_call_date', 'like', $date_get)->limit(100)->get();
        } else {
            // dd($date_get);
            $soKyTu = strlen($request->phone);

            // kiểm tra số điện thoại đầu vào 
            //số đầu vào 9 ký tự dạng 912847218
            if ($soKyTu == 9) {
                $phone = '84' . $request->phone;
            }
            // + số đầu vào chứa 11 ký tự dạng 84
            elseif ($soKyTu == 10) {
                $chuoiSauXoaKyTuDauTien = substr($request->phone, 1);
                $phone = '84' . $chuoiSauXoaKyTuDauTien;
            } else {
                $phone = $request->phone;
            }
            // lấy được danh sách số liên hệ mà thợ gọi ra từ số điện thoại của Thợ.
            $list_phone_worker_call = CheckCallWorker::where('worker_phone', '=', $phone)->where('worker_call_date', 'like', $date_get)->get();
            // danh sách khách lịch phân cho thợ mà thợ không gọi bằng số công ty
            $code_worker = 1;
            $list_customer_from_cpn = 1;


            // số kí tự đúng 10 ký tự dạng 0912847218
        }
        return $rturn_call;
        // dd($rturn_call);
    }
    public function getWorkerDetails(Request $request)
    {
        $date = '%' . $request->this_month . '/' . $request->this_year;
        $da_book = $request->this_year . '-' . $request->this_month . '%';

        if ($request->this_year && $request->this_month && !$request->phone) {
            $return_call = CheckCallWorker::where('worker_call_date', 'like', $date)->limit(500)->get();
            return response()->json($return_call);
        } else {
            $worker_phone_company = $request->phone;
            $formatted_phone = $worker_phone_company;

            $phone_length = strlen($worker_phone_company);

            if ($phone_length == 9) {
                $formatted_phone = '84' . $worker_phone_company;
            } elseif ($phone_length == 10 && $worker_phone_company[0] == '0') {
                $formatted_phone = '84' . substr($worker_phone_company, 1);
            }

            // Lấy mã của thợ từ số điện thoại
            $worker_code = DB::table('workers')
                ->select('worker_code')
                ->where('worker_phone_company', $worker_phone_company)
                ->value('worker_code');

            // Tìm trường chứa mã thợ trong bảng customers
            $customer_phone_field = DB::table('old_custus')
                ->where('date_book', 'like', $da_book)
                ->where('sort_name', $worker_code)
                ->get(['phone_cus']);
            // Lấy số điện thoại tương ứng từ trường chứa mã thợ
            //$formatted_phone = "84919839118";
            //$customer_phone_field = '[{"phone_cus": "974662703"},{"phone_cus": "343777372"},{"phone_cus": "937704476"},{"phone_cus": "357999895"},{"phone_cus": "909567187"},{"phone_cus": "913762346"},{   "phone_cus": "909883420" },{"phone_cus": "911283216"},{"phone_cus": "379591125" }]';

            $customer_phones = json_decode($customer_phone_field, true);
            $o = DB::table('check_call_workers')
                ->where(function ($query) use ($formatted_phone, $customer_phones) {
                    $query->where('worker_phone', $formatted_phone)
                        ->whereIn('worker_phone_called', collect($customer_phones)->pluck('phone_cus')->toArray());
                })
                ->where('worker_call_date', 'like', $date)
                ->update(['worker_call_check' => 1]);

            // $results = DB::table('check_call_workers')
            //     ->where('worker_phone', $formatted_phone)
            //     ->where('worker_call_date', 'like', $date)
            //     ->where(function ($query) use ($customer_phones) {
            //         $query
            //             ->whereIn('worker_phone_called', collect($customer_phones)->pluck('phone_cus')->toArray());
            //     })
            //     ->select('worker_phone', 'worker_phone_called', 'worker_call_date', 'worker_call_time', 'worker_call_start_time', 'worker_call_check')
            //     ->orderBy('worker_call_check', 'desc')
            //     ->get();

            // dd($results);
            // $result = [];
            // foreach ($callData as $call) {
            //     $status = ($call->worker_phone == $formatted_phone && $call->worker_phone_called == $customer_phone_field) ? 1 : 0;
            //     $result[] = [
            //         'worker_phone' => $call->worker_phone,
            //         'worker_phone_called' => $call->worker_phone_called,
            //         'worker_call_date' => $call->worker_call_date,
            //         'worker_call_time' => $call->worker_call_time,
            //         'worker_call_start_time' => $call->worker_call_start_time,
            //         'worker_call_check' => $status
            //     ];
            // }

            return response()->json($o);
        }
    }
}
