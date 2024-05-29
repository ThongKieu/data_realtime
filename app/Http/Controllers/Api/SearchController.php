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
        $data = WorksAssignment::with([
        'work'=>function($query){
            $query->select('id', 
             'work_content',
            'work_note',
            'name_cus',
            'date_book',
            'phone_number',
            'street',
            'district',
            'member_read', );
         },
        'worker'=>function($query){
            $query->select('id', 
            'worker_full_name',      
            'worker_code', );
         },
        'warranty' => function($query) {
             $query->select(
                 'id','id_work_has','warranty_time','warranty_info','unit'
             );
         }])
        ->where('id', '>', 0)
        ->where('status_work','=',2)
        ->orderBy('id', 'desc')
        ->limit(100)
        ->get(
            [
                "id",
                "id_cus",
                "id_worker",
                "id_phu",
                "real_note",
                "spending_total",
                "income_total",
                "bill_imag",
                "seri_imag",
                "status_work",
                "check_in",
                "seri_number",
                "status_admin_check",
                "flag_check"
            ]
        );
        return $data;
    }
    public function searchAjax(Request $request)
    {
        // dd($request->all());
        $key = $request->keySearch;

        if ($key !== null && $key !== '') {
            $key = '%' . $key . '%';
    
            // Sử dụng Eloquent để truy vấn với các quan hệ
            $data = WorksAssignment::with(['work' => function($query) use ($key) {
                    $query->where('phone_number', 'like', $key)
                          ->orWhere('street', 'like', $key)
                          ->select('id', 
                          'work_content',
                          'work_note',
                          'name_cus',
                          'date_book',
                          'phone_number',
                          'street',
                          'district',);
                },
                'worker'=>function($query){
                   $query->select('id', 
                   'worker_full_name',      
                   'worker_code', );
                },
                'warranty' => function($query) {
                    $query->select(
                        'id','id_work_has','warranty_time','warranty_info','unit'
                    );
                }])
                ->orderBy('id', 'desc')
                ->limit(100)
                ->get([
                    "id",
                    "id_cus",
                    "id_worker",
                    "id_phu",
                    "real_note",
                    "spending_total",
                    "income_total",
                    "bill_imag",
                    "seri_imag",
                    "status_work",
                    "check_in",
                    "seri_number",
                    "status_admin_check",
                    "flag_check"
                ]);
    
            return response()->json($data);
        } else {
            $data = WorksAssignment::with([
                'work'=>function($query){
                $query->select('id', 
                'work_content',
                'work_note',
                'name_cus',
                'date_book',
                'phone_number',
                'street',
                'district',
                'member_read', );
                },
                'worker'=>function($query){
                    $query->select('id', 
                    'worker_full_name',      
                    'worker_code', );
                },
                'warranty' => function($query) {
                    $query->select(
                        'id','id_work_has','warranty_time','warranty_info','unit'
                    );
                }])
                ->orderBy('id', 'desc')
                ->limit(100)
                ->get([
                    "id",
                    "id_cus",
                    "id_worker",
                    "id_phu",
                    "real_note",
                    "spending_total",
                    "income_total",
                    "bill_imag",
                    "seri_imag",
                    "status_work",
                    "check_in",
                    "seri_number",
                    "status_admin_check",
                    "flag_check"
                ]);
    
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
