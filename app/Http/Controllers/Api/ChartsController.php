<?php

namespace App\Http\Controllers;

use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ChartsController extends Controller
{
    public function TopBannerAdmin()
    {

        $today = Carbon::now();
        $this_m  = $today->format('m-y');
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
}
