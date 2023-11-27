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
        
        if($request->this_year && $request->this_month && $request->phone == null)
        {
            $date_get = '%'.$request->this_month.'/'.$request->this_year;
            // dd($date_get);
            $rturn_call = CheckCallWorker::where('worker_call_date','like',$date_get)->limit(100)->get();
        }
        else
        {
            $date_get = '%'.$request->this_month.'/'.$request->this_year;
            // dd($date_get);
            $soKyTu = strlen($request->phone);
            if($soKyTu == 11)
            {
                $rturn_call = CheckCallWorker::where('worker_call_date','like',$date_get)->limit(100)->get();
            }
            elseif($soKyTu == 9)
            {
                $phone = '84'.$request->phone;
                $rturn_call = CheckCallWorker::where('worker_phone','=',$phone)->where('worker_call_date','like',$date_get)->limit(100)->get();
            }
            else
            {
                $chuoiSauXoaKyTuDauTien = substr($request->phone, 1);
                $phone = '84'.$chuoiSauXoaKyTuDauTien;
                $rturn_call = CheckCallWorker::where('worker_phone','=',$phone)->where('worker_call_date','like',$date_get)->limit(100)->get();
            }
            foreach($rturn_call as $item)
            {   

                $phone_cus=substr($item['worker_phone_called'],1);
                // dd($phone_cus);

                $date_get = '%'.$request->this_month.'/'.$request->this_year;
                $get = OldCustomer::where('phone_cus','=',$phone_cus)->where('date_book','like',$date_get)->get('id');
                if(count($get)>0)
                {
                    $item['check'] = 1;
                }
                else
                {
                    $item['check'] = 0;
                }
            }

            

        }
        
        return $rturn_call;
    }
}
