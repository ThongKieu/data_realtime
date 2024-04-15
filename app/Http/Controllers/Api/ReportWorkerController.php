<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FuelOTWorker;
use App\Models\ReportWorker;
use Illuminate\Http\Request;

class ReportWorkerController extends Controller
{
    //
    public static function setReportDay($id_worker, $date_do, $work_revenue, $work_expenditure)
    {
        // dd($id_worker);
        if ($id_worker != null) {
            $check = ReportWorker::where('date_do', '=', $date_do)->where('id_worker', '=', $id_worker)->get('work_revenue', 'work_expenditure');
            if (count($check) == 1) {
                if ($work_revenue == null) {
                    $work_revenue = 0;
                }
                if ($work_expenditure == null) {
                    $work_expenditure = 0;
                }

                foreach ($check as $item) {
                    $item->work_revenue = $item->work_revenue + $work_revenue;
                    $item->work_expenditure = $item->work_expenditure + $work_expenditure;
                }


                $up = ReportWorker::where('date_do', '=', $date_do)->where('id_worker', '=', $id_worker)->update(['work_revenue' => $item->work_revenue, 'work_expenditure' => $item->work_expenditure]);
                if ($up) {
                    return 1;
                }
                return 0;
            } else {
                $add_n = new ReportWorker([
                    'id_worker' => $id_worker,
                    'date_do' => $date_do,
                    'work_revenue' => $work_revenue,
                    'work_expenditure' => $work_expenditure,
                ]);
                $add_n->save();
                if ($add_n) {
                    return 1;
                }
            }
        }
        return 0;
    }
    public function getByIdWorker(Request $r)
    {
        if ($r->date_check == null) {
            $date_check = date('Y-m-d');
        }
        else{
            $date_check= $r->date_check;
        }
        if ($r->id_worker != null) {
            $data = ReportWorker::where('date_do', '=', $date_check)->where('id_worker', '=', '4')->get(['id_worker', 'date_do', 'work_revenue', 'work_expenditure']);
            $data_2 = FuelOTWorker::where('fuel_o_t_workers_date_set', '=', $date_check)->where('fuel_o_t_workers_id', '=', '4')->get(['fuel_o_t_workers_content', 'fuel_o_t_workers_spend_money']);
            // dd($data_2);

            if (count($data) > 0 || count($data_2) > 0) {
                
                $array1 = json_decode($data, true);
                $array2 = json_decode($data_2, true);

                // Nối các mảng
                $r_data = array_merge($array1, $array2);
               
            } else {
                $r_data = 0;
            }
            return response()->json($r_data);
        }
        return response()->json(' Vui lòng kiểm tra lại thông tin');
    }
}
