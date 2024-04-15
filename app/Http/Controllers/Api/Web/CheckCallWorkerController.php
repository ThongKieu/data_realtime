<?php

namespace App\Http\Controllers\Api\Web;

use App\Imports\ImportCheckCallWorker;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\CheckCallWorker;
use App\Models\OldCustomer;

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
            if($soKyTu == 9)
            {
                $phone = '84'.$request->phone;
            }
            // + số đầu vào chứa 11 ký tự dạng 84
             elseif ($soKyTu == 10) 
            {
                $chuoiSauXoaKyTuDauTien = substr($request->phone, 1);
                $phone = '84' . $chuoiSauXoaKyTuDauTien;
            }
            else
            {
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
}
