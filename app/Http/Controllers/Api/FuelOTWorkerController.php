<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\FuelOTWorker;
use Illuminate\Http\Request;

class FuelOTWorkerController extends Controller
{
    //
    public function __invoke()
    {
    }
    public function getByIdWorker(Request $r)
    {
        // dd($r->all());
        if ($r->date_check != null) {
            $fuel_o_t_workers_date_set = $r->date_check;
        } else {
            $fuel_o_t_workers_date_set = date('Y-m-d');
        }
        if ($r->id) {
            $fuel_o_t_workers_id = $r->id;

            $get_id = FuelOTWorker::where('fuel_o_t_workers_date_set', '=', $fuel_o_t_workers_date_set)->where('fuel_o_t_workers_id', '=', $fuel_o_t_workers_id)->get([
                'fuel_o_t_workers_id', 'fuel_o_t_workers_content', 'fuel_o_t_workers_spend_money',
                'fuel_o_t_workers_date_set', 'fuel_o_t_workers_flag', 'fuel_o_t_id_admin_check'
            ]);
            if ($get_id) {
                return response()->json($get_id);
            } else
                // Chua có thông tin theo ngày
                return response()->json(0);
        }
        // none id
        return response()->json(-1);
    }
    public function getAllFOWorker(Request $r)
    {
        if ($r->date_check != null) {
            $fuel_o_t_workers_date_set = $r->date_check;
        } else {

            $fuel_o_t_workers_date_set = date('Y-m-d');
        }

        $get_id = FuelOTWorker::where('fuel_o_t_workers_date_set', '=', $fuel_o_t_workers_date_set)->get([
            'fuel_o_t_workers_id', 'fuel_o_t_workers_content', 'fuel_o_t_workers_spend_money',
            'fuel_o_t_workers_date_set', 'fuel_o_t_workers_flag', 'fuel_o_t_id_admin_check'
        ]);
        if ($get_id) {
            return response()->json($get_id);
        } else
            // Chua có thông tin theo ngày
            return response()->json(0);
    }
    public  function insertFuelOTWorker(Request $r)
    {
        // $id_worker, $fuel_o_t_workers_content,$fuel_o_t_workers_spend_money
        $fuel_o_t_workers_date_set = date('Y-m-d');
        $fuel_o_t_workers_flag = 0;

        $new = new FuelOTWorker(
            [
                'fuel_o_t_workers_id' => $r->id_worker,
                'fuel_o_t_workers_content' => $r->fuel_o_t_workers_content,
                'fuel_o_t_workers_spend_money' => $r->fuel_o_t_workers_spend_money,
                'fuel_o_t_workers_date_set' => $fuel_o_t_workers_date_set,
                'fuel_o_t_workers_flag' => $fuel_o_t_workers_flag,
            ]
        );
        $new->save();
        if ($new) {
            return 1;
        }
        return 0;
    }
    public static function checkFuelOTByAdmin($id_fuel, $id_admin_check)

    {

        $up = FuelOTWorker::where('id', '=', $id_fuel)->update(['fuel_o_t_workers_flag' => 1, 'fuel_o_t_id_admin_check' => $id_admin_check]);
        if ($up) {
            return 1;
        }
        return 0;
    }
    public static function updateFuelOT(Request $r)

    {

            // lấy id của dòng
            $up = FuelOTWorker::where('id', '=', $r->id)->update(['fuel_o_t_workers_content' => $r->fuel_o_t_workers_content,
            'fuel_o_t_workers_spend_money' => $r->fuel_o_t_workers_spend_money]);
            if ($up) {
                return 1;
            }
            return 0;

    }
}
