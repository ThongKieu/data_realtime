<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warranties;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SearchController extends Controller
{
    //
    public function index()
    {

        // $data = WorksAssignment::where('id','!=','0')->orderBy('id','desc')->limit(100)->get();
        $data = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.id','>','0')
            ->orderBy('works_assignments.id','desc')
            ->limit(100)->get([
                "works_assignments.id",
                "works_assignments.id_cus",
                "works_assignments.id_worker",
                "works_assignments.id_phu",
                "works_assignments.real_note",
                "works_assignments.spending_total",
                "works_assignments.income_total",
                "works_assignments.bill_imag",
                "works_assignments.seri_imag",
                "works_assignments.status_work",
                "works_assignments.check_in",
                "works_assignments.seri_number",
                "works_assignments.status_admin_check",
                "works_assignments.flag_check",
                "works.work_content",
                "works.date_book",
                "works.street",
                "works.district",
                "works.phone_number",
                "works.image_work_path",
                "works.kind_work",
                "workers.worker_full_name",
                // "workers.worker_name",
                "works.name_cus"]);
        return $data;
    }
    public function searchAjax(Request $request)
    {
        
        if($request ->keySearch || $request->keySearch != null || $request->keySearch != '' || $request->keySearch != [] ) 
        {
            $key= '%'.$request->keySearch.'%';
            $data = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.id','>','0')
            ->where('works.phone_number','like',$key)
            ->orWhere('works.street','like',$key)
            ->orderBy('works_assignments.id','desc')
            ->limit(100)->get([
                "works_assignments.id",
                "works_assignments.id_cus",
                "works_assignments.id_worker",
                "works_assignments.id_phu",
                "works_assignments.real_note",
                "works_assignments.spending_total",
                "works_assignments.income_total",
                "works_assignments.bill_imag",
                "works_assignments.seri_imag",
                "works_assignments.status_work",
                "works_assignments.check_in",
                "works_assignments.seri_number",
                "works_assignments.status_admin_check",
                "works_assignments.flag_check",
                "works.work_content",
                "works.date_book",
                "works.street",
                "works.district",
                "works.phone_number",
                "works.image_work_path",
                "works.kind_work",
                "workers.worker_full_name",
                // "workers.worker_name",
                "works.name_cus"]);
            return response()->json($data);
        }
        $data = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->join('warranties','works_assignments.id', '=', 'warranties.id_work_has')
            ->where('works_assignments.id','>','0')
            ->orderBy('works_assignments.id','desc')
            ->limit(100)->get([
                "works_assignments.id",
                "works_assignments.id_cus",
                "works_assignments.id_worker",
                "works_assignments.id_phu",
                "works_assignments.real_note",
                "works_assignments.spending_total",
                "works_assignments.income_total",
                "works_assignments.bill_imag",
                "works_assignments.seri_imag",
                "works_assignments.status_work",
                "works_assignments.check_in",
                "works_assignments.seri_number",
                "works_assignments.status_admin_check",
                "works_assignments.flag_check",
                "works.work_content",
                "works.date_book",
                "works.street",
                "works.district",
                "works.phone_number",
                "works.image_work_path",
                "works.kind_work",
                "workers.worker_full_name",
                // "workers.worker_name",
                "works.name_cus"]);
        return response()->json($data);
    }

   public function createWarrantyFromSearch(Request $request ) 
   {
    
   } 
   public function getWarraties(Request $request) {
     Warranties::where('id_work_has','=',$request->id);
   }
}
