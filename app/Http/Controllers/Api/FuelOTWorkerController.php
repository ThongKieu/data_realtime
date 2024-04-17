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
            $fuel_o_t_workers_date_set = date("d-m-Y", strtotime($r->date_check));
        } else {
            $fuel_o_t_workers_date_set = date('d-m-Y');
        }
        if ($r->id) {
            $fuel_o_t_workers_id = $r->id;

            $get_id = FuelOTWorker::where('fuel_o_t_workers_date_set', '=', $fuel_o_t_workers_date_set)->where('fuel_o_t_workers_id', '=', $fuel_o_t_workers_id)->get([
                'fuel_o_t_workers_id', 'fuel_o_t_workers_content', 'fuel_o_t_workers_spend_money',
                'fuel_o_t_workers_date_set', 'fuel_o_t_workers_flag', 'fuel_o_t_id_admin_check',
            ]);
            if ($get_id) {
                return response()->json($get_id);
            } else
            // Chua có thông tin theo ngày
            {
                return response()->json(0);
            }
        }
        // none id
        return response()->json(-1);
    }
    public function getAllFOWorker(Request $r)
    {
        if ($r->date_check != null) {
            $fuel_o_t_workers_date_set = date("d-m-Y", strtotime($r->date_check));
        } else {

            $fuel_o_t_workers_date_set = date('d-m-Y');
        }

        $get_id = FuelOTWorker::where('fuel_o_t_workers_date_set', '=', $fuel_o_t_workers_date_set)->get([
            'fuel_o_t_workers_id', 'fuel_o_t_workers_content', 'fuel_o_t_workers_spend_money',
            'fuel_o_t_workers_date_set', 'fuel_o_t_workers_flag', 'fuel_o_t_id_admin_check',
        ]);
        if ($get_id) {
            return response()->json($get_id);
        } else
        // Chua có thông tin theo ngày
        {
            return response()->json(0);
        }
    }
    public function insertFuelOTWorker(Request $r)
    {
        $fuel_o_t_workers_date_set = date('d-m-Y');
        $fuel_o_t_workers_flag = 0;

        if ($r->fuel_o_t_workers_spend_money > 0) {
            if ($r->fuel_o_t_workers_content == 'CX') {
                $check = FuelOTWorker::where('fuel_o_t_workers_date_set', 'like', $fuel_o_t_workers_date_set)->where('fuel_o_t_workers_id', '=', $r->id_worker)->where('fuel_o_t_workers_content', '=', 'CX')->get();
                if (count($check) == 0) {
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
                    } else {
                        return 0;
                    }
                } else {
                    foreach ($check as $item) {
                        $id = $item->id;
                        // Sử dụng $id ở đây cho mục đích của bạn
                    }
                    $update = FuelOTWorker::where('id', '=', $check['id'])->update(['fuel_o_t_workers_spend_money' => $r->fuel_o_t_workers_spend_money]);
                    if ($update) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            //
            if ($r->fuel_o_t_workers_content == 'TC') {
                $check = FuelOTWorker::where('fuel_o_t_workers_date_set', 'like', $fuel_o_t_workers_date_set)->where('fuel_o_t_workers_id', '=', $r->id_worker)->where('fuel_o_t_workers_content', '=', 'TC')->get();
                if (count($check) == 0) {
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
                    } else {
                        return 0;
                    }
                } else {
                    $update = FuelOTWorker::where('id', '=', $check['id'])->update(['fuel_o_t_workers_spend_money' => $r->fuel_o_t_workers_spend_money]);
                    if ($update) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }
            //
            if ($r->fuel_o_t_workers_content == 'CP') {
                $check = FuelOTWorker::where('fuel_o_t_workers_date_set', 'like', $fuel_o_t_workers_date_set)->where('fuel_o_t_workers_id', '=', $r->id_worker)->where('fuel_o_t_workers_content', '=', 'CP')->get();
                if (count($check) == 0) {
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
                    } else {
                        return 0;
                    }
                } else {
                    $update = FuelOTWorker::where('id', '=', $check['id'])->update(['fuel_o_t_workers_spend_money' => $r->fuel_o_t_workers_spend_money]);
                    if ($update) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

        }

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
        $up = FuelOTWorker::where('id', '=', $r->id)->update([
            'fuel_o_t_workers_content' => $r->fuel_o_t_workers_content,
            'fuel_o_t_workers_spend_money' => $r->fuel_o_t_workers_spend_money,
        ]);
        if ($up) {
            return 1;
        }
        return 0;
    }
}
