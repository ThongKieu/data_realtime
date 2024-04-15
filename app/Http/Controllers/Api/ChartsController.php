<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;

use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartsController extends Controller
{
    public function TopBannerAdmin()
    {

        $today = Carbon::now();
        $this_m  = $today->format('y-m');
        // $this_m = '';
        $befo_m = $today->subMonth(1);;
        
        $dien_nuoc = WorksAssignment::where('');
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
        $date_check[] ='';
        for($i = 1; $i < 13 ; $i++)
        {   
            if ($i < 10) {
                $i = str_pad($i, 2, '0', STR_PAD_LEFT);
            }
            $date_check = '%'.$i.'-'.$year_n;
            $a[] = WorksAssignment::where('work_done_date', 'like',$date_check)->get('income_total');
        }
        for($i= 0; $i<12; $i ++)
        {   
            $sum[$i] = 0;
            foreach($a[$i] as  $item)
            {
                $sum[$i] += $item->income_total;
            }
        }
        return $sum;
    }
    public function chiPhiNam(Request $r)
    {
        $year_n = date('Y');
        $date_check[] ='';
        for($i = 1; $i < 13 ; $i++)
        {   
            if ($i < 10) {
                $i = str_pad($i, 2, '0', STR_PAD_LEFT);
            }
            $date_check = '%'.$i.'-'.$year_n;
            $a[] = WorksAssignment::where('work_done_date', 'like',$date_check)->get('spending_total');
        }
        for($i= 0; $i<12; $i ++)
        {   
            $sum[$i] = 0;
            foreach($a[$i] as  $item)
            {
                $sum[$i] += $item->spending_total;
            }
        }
        return $sum;
    }
}
