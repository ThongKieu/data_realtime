<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CodeWorkerKind;
use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChartsController extends Controller
{
    public function TopBannerAdmin()
    {
        // đang làm
        $today = Carbon::now();
        $this_m  = $today->format('Y-m');
        // $this_m = '';
        $befo_m = $today->subMonth(1)->format('Y-m');
        // $befo_m->format('Y-m');
        // dd($this_m);
        $workercode = CodeWorkerKind::where('id', '>', 0)->get('id');
        $data_json = [];
        foreach ($workercode as $kindId => $kindWorker) {
            $data_json[$kindId]['kind_worker'] = $kindWorker;
            $data_json[$kindId]['this_m'] = count(
                DB::table('works_assignments')
                    ->join('works', 'works_assignments.id_cus', 'works.id')
                    ->where('status_work', '=', 2)
                    ->where('kind_work_assign', '=', $kindId + 1)
                    ->where('work_done_date', 'like', $this_m . '%')
                    ->get('works_assignments.id')
            );
            $data_json[$kindId]['befo_m'] = count(
                DB::table('works_assignments')
                    ->join('works', 'works_assignments.id_cus', 'works.id')
                    ->where('status_work', '=', 2)
                    ->where('kind_work_assign', '=', $kindId + 1)
                    ->where('work_done_date', 'like', $befo_m . '%')
                    ->get('works_assignments.id')
            );
        }
        // $dien_nuoc = DB::table('works_assignments')
        // ->join('works','works_assignments.id_cus','works.id')
        // ->where('work_done_date', 'like',$befo_m.'%')
        // ->where('status_work','=',2)
        // ->get('works_assignments.id');
        // ;


        return $data_json;
    }
    public function DoanhThuBang()
    {
    }
    public function GhiNhanLichBang()
    {
    }
    public function doanhThuNam(Request $r)
    {
        $year_n = date('Y');
        $date_check[] = '';
        for ($i = 1; $i < 13; $i++) {
            if ($i < 10) {
                $i = str_pad($i, 2, '0', STR_PAD_LEFT);
            }
            $date_check = '%' . $i . '-' . $year_n;
            $a[] = WorksAssignment::where('work_done_date', 'like', $date_check)->get('income_total');
        }
        for ($i = 0; $i < 12; $i++) {
            $sum[$i] = 0;
            foreach ($a[$i] as  $item) {
                $sum[$i] += $item->income_total;
            }
        }
        return $sum;
    }
    public function chiPhiNam(Request $r)
    {
        $year_n = date('Y');
        $date_check[] = '';
        for ($i = 1; $i < 13; $i++) {
            if ($i < 10) {
                $i = str_pad($i, 2, '0', STR_PAD_LEFT);
            }
            $date_check = '%' . $i . '-' . $year_n;
            $a[] = WorksAssignment::where('work_done_date', 'like', $date_check)->get('spending_total');
        }
        for ($i = 0; $i < 12; $i++) {
            $sum[$i] = 0;
            foreach ($a[$i] as  $item) {
                $sum[$i] += $item->spending_total;
            }
        }
        return $sum;
    }
}
