<?php

namespace App\Http\Controllers\Api\Web;

use App\Imports\ImportCheckCallWorker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\CheckCallWorker;
use App\Models\OldCustomer;
use App\Models\Worker;
use Illuminate\Support\Facades\DB;

class CheckCallWorkerController extends Controller
{
    public function importDataCheckCallWorker(Request $request)
    {
        $imported = Excel::import(new ImportCheckCallWorker(), $request->file);


        if ($imported) {
            // CheckCallWorkerController::updateCheck();
            return 'Ok';
        } else {
            return 'Failed';
        }
    }
    public static function updateCheck()
    {
        $get_month_check = CheckCallWorker::where('id', '>', 1)->value('worker_call_date');
        //01/02/2024
        $dateParts = explode("/", $get_month_check); // Tách chuỗi dựa trên dấu "/"
        if (count($dateParts) == 3) {
            $month = $dateParts[1]; // Lấy tháng
            $year = $dateParts[2]; // Lấy năm
            $formattedDate = $year . '-' . $month . '%'; // Kết hợp tháng và năm lại với dấu "-"
            $formattedDate_check = '%' . $month . '/' . $year;
            // $formattedDate giờ chứa giá trị "02-2024"
            // lấy danh sách khách hàng làm việc trong tháng và mã thợ làm việc
            $list_cus_old = DB::table('old_custus')->where('date_book', 'like', $formattedDate)->get(['phone_cus', 'sort_name']);
            foreach ($list_cus_old as $cus) {
                // lấy số điện thoại của thợ trong bảng worker làm việc
                $get_phone_worker = Worker::where('worker_code', '=', $cus->sort_name)->value('worker_phone_company');
                $soKyTu = strlen($get_phone_worker);

                // kiểm tra số điện thoại đầu vào 
                //số đầu vào 9 ký tự dạng 912847218
                if ($soKyTu == 9) {
                    $cus->sort_name = '84' . $get_phone_worker;
                }
                // + số đầu vào chứa 11 ký tự dạng 84
                elseif ($soKyTu == 10) {
                    $chuoiSauXoaKyTuDauTien = substr($get_phone_worker, 1);
                    $cus->sort_name = '84' . $chuoiSauXoaKyTuDauTien;
                } else {
                    $cus->sort_name = $get_phone_worker;
                }
            }
            // $list_cus_old =[{"phone_cus"=> "974662703" ,"sort_name"=> "84919839118"},{"phone_cus"=> "343777372" ,"sort_name"=> "84919839118"}];

            // lấy mảng dữ liệu khách trong tháng
            // $get_cus_in_table_check_call=CheckCallWorker::where('worker_call_date', 'like', $formattedDate_check)->get();
            // kiểm tra xem giá trị trong mảng $list_cus_old có cùng tồn tại trên 1 trường trong mảng $get_cus_in_table_check_call hay không nếu có thì đổi update(['worker_call_check' => 1]) thợ gọi khách bằng số công ty
            // kiểm tra xem giá trị trong mảng $list_cus_old có chỉ tồn tại trường sort_name trong $get_cus_in_table_check_call hay không nếu có thì đổi update(['worker_call_check' => 2]) Thợ gọi khách ngoài danh sach công ty gửi
            $phoneNumbers = collect($list_cus_old)->pluck('phone_cus');
            $sortNames = collect($list_cus_old)->pluck('sort_name');


            CheckCallWorker::whereIn('worker_phone_called', $phoneNumbers)
                ->whereIn('worker_phone', $sortNames)
                ->update(['worker_call_check' => DB::raw('(CASE WHEN EXISTS(SELECT 1 FROM check_call_workers WHERE check_call_workers.worker_phone_called = check_call_workers.worker_phone_called AND check_call_workers.worker_phone = check_call_workers.worker_phone) THEN 1 ELSE 2 END)')]);
        }
        // dd(json_decode($list_cus_old));
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
            // trả về toàn bộ số điện thoại của khách đã phân cho thợ trong tháng đó
            $customer_phone_field = DB::table('old_custus')
                ->where('date_book', 'like', $da_book)
                ->where('sort_name', $worker_code)
                ->get(['phone_cus']);
            // Lấy số điện thoại tương ứng từ trường chứa mã thợ
            //$formatted_phone = "84919839118";
            //$customer_phone_field = '[{"phone_cus": "974662703"},{"phone_cus": "343777372"},{"phone_cus": "937704476"},{"phone_cus": "357999895"},{"phone_cus": "909567187"},{"phone_cus": "913762346"},{   "phone_cus": "909883420" },{"phone_cus": "911283216"},{"phone_cus": "379591125" }]';
            // Chuyển chuỗi dữ liệu customer_phone_field thành mảng PHP
            $customer_phones = json_decode($customer_phone_field, true);

            // Lấy danh sách các số điện thoại chỉ có trong mảng customer_phones
            $missingPhoneNumbers = collect($customer_phones)->pluck('phone_cus')->toArray();

            // Lấy danh sách các số điện thoại có trong bảng check_call_workers
            DB::table('check_call_workers')
                ->where('worker_phone', $formatted_phone)
                ->pluck('worker_phone_called')
                ->toArray();

            // Cập nhật trường hợp 1
            DB::table('check_call_workers')
                ->where('worker_phone', $formatted_phone)
                ->whereExists(function ($query) use ($formatted_phone) {
                    $query->select(DB::raw(1))
                        ->from('check_call_workers')
                        ->whereColumn('worker_phone_called', 'worker_phone');
                })
                ->update(['worker_call_check' => 1]);;

            // Cập nhật trường hợp 2
            // DB::table('check_call_workers')
            //     ->where('worker_phone', $formatted_phone)
            //     ->whereNotIn('worker_phone_called', $customer_phones)
            //     ->update(['worker_call_check' => 2]);

            // // Cập nhật trường hợp 3
            // DB::table('check_call_workers')
            //     ->where('worker_phone', $formatted_phone) // Số điện thoại cụ thể
            //     ->whereIn('worker_phone_called', $workerPhoneNumbers)
            //     ->whereNotIn('worker_phone_called', $missingPhoneNumbers)
            //     ->update(['worker_call_check' => 3]);

            $results = DB::table('check_call_workers')
                ->where('worker_phone', $formatted_phone)
                ->where('worker_call_date', 'like', $date)
                // ->select('id','worker_phone', 'worker_phone_called', 'worker_call_date', 'worker_call_time', 'worker_call_start_time', 'worker_call_check')
                ->orderBy('worker_call_check', 'desc')
                ->get();

            // dd($results);
            // $result = [];
            // foreach ($results as $call) {
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

            return response()->json($results);
        }
    }
}
