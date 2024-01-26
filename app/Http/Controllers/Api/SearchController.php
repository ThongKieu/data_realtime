<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    //
    public function index()
    {

        $data = WorksAssignment::where('id','!=','0')->orderBy('id','asc')->limit(100)->get();
        return $data;
    }
    public function searchAjax(Request $request)
    {
        // dd($request->all());
        if($request ->keySearch || $request->keySearch != null)
        {
            $key= '%'.$request->keySearch.'%';
            $data = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->join('warranties','works_assignments.id', '=', 'warranties.id_work_has')
            ->where('works_assignments.id','>','0')
            ->where('works.phone_number','like',$key)
            ->orWhere('works.street','like',$key)
            ->orderBy('works_assignments.id','desc')
            ->limit(100)->get();
            return response()->json($data);
        }
        $data = WorksAssignment::where('id','!=','0')->orderBy('id','desc')->limit(100)->get();
        return response()->json($data);
    }
}
