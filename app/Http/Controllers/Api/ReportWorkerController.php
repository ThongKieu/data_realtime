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
            if (count($check) == 0) {
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
            } else {
                
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
            }
        }
        return 0;
    }
    public function getByIdWorker(Request $r)
    {
        if ($r->date_check == null || $r->date_check == '') {
            $date_check = date('d-m-Y');
        } else {
            $date_check = date("d-m-Y", strtotime($r->date_check));
        }

        if ($r->id_worker != null) {
            $data = ReportWorker::where('date_do', '=', $date_check)->where('id_worker', '=', $r->id_worker)->get(['id_worker', 'date_do', 'work_revenue', 'work_expenditure']);
            $data_2 = FuelOTWorker::where('fuel_o_t_workers_date_set', '=', $date_check)->where('fuel_o_t_workers_id', '=', $r->id_worker)->get(['fuel_o_t_workers_content', 'fuel_o_t_workers_spend_money']);

            if (count($data) > 0) {
                foreach ($data as $item) {
                    $item->fuel_ot = $data_2;
                }
                return response()->json($data);
            } else {
                if (count($data_2) > 0) {
                    $dataEmpty = [['id_worker' => $r->id_worker, 'date_do' => $date_check, 'work_revenue' => 0, 'work_expenditure' => 0]];
                    foreach ($dataEmpty as &$item) {
                        $item['fuel_ot'] = $data_2;
                    }
                    return response()->json($dataEmpty);

                } else {
                    return [];
                }
            }
        } else {
            return response()->json('Vui lòng kiểm tra lại thông tin');
        }

    }
}
