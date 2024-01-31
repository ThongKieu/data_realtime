<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Warranties;
use App\Models\Work;
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
                "workers.worker_code",
                // "workers.worker_name",
                "works.name_cus"]);
        return $data;
    }
    public function searchAjax(Request $request)
    {
        // dd($request->all());
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
                "workers.worker_code",
                // "workers.worker_name",
                "works.name_cus"]);
            return response()->json($data);
        }
       else
       {
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
                "workers.worker_code",
                // "workers.worker_name",
                "works.name_cus"]);
        return response()->json($data);
       }
    }

   public function createWarrantyFromSearch(Request $request ) 
   {
        $id_cus = $request->id_cus;
        $data = Work::where('id','=',$id_cus)->get();
        $date = date('Y-m-d');
        foreach ($data as $item)
        {
            $work_content = 'BH - '. $item -> work_content;
            if($item->work_note != null)
            {
                $note =$item->date_book .'-' . $request->worker_full_name .' - '. $item -> work_note ;
            }
            else
            {
                $note =$item->date_book .'-' . $request->worker_full_name;
            }
            $w = new Work([
            'work_content' => $work_content,
            'work_note' => $note,
            'name_cus' => $item -> name_cus,
            'date_book' => $date,
            'phone_number' => $item -> phone_number,
            'street' => $item -> street,
            'district' => $item -> district,
            'kind_work' => $item -> kind_work,
            'status_cus'=> $item -> status_cus,
            'image_work_path'=> $item -> image_work_path
            ]);
            $w ->save();
            $id = Work::where('phone_number', '=', $item -> phone_number)->where('work_content' ,'=', $work_content)-> orderBy('id','desc')->value('id');
            
            if($id != null)
            {   
                $id_worker = Worker::where('worker_code','=',$request->worker_code)->value('id');
                

                $new = new WorksAssignment([
                    'id_cus'=> $id,
                    'id_worker'=>$id_worker,
                    'status_work'=>'4',
                    'real_note'=>$note,
                ]);
                $new -> save();

                return 'Done !!!';
            }
            
        }
        return $request->all();
   } 
   public function getWarraties(Request $request) {
     if($request->id)
     {
        $warran= Warranties::where('id_work_has','=',$request->id)->get();
        if(count($warran) > 0 )
        {
            return $warran;

        }
        else 
        {
            return null;
        }
     }
     else{ return "No ID found!";}
   }
}
