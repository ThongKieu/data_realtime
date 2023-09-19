<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WorksAssignmentController extends Controller
{
    public function __invoke()
    {

    }
    public function allWorkAssign (Request $request)
    {
        if($request->dateCheck)
        {
            $today = $request->dateCheck;
        }
        else
        {
            $today = date('Y-m-d');
        }
        // thông tin điện nước
        $dien_nuoc = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        $dien_lanh = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        $do_go = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        $nlmt = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        $xay_dung = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        $tai_xe = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        $co_khi = DB::table('works_assignments')
        ->join('works','works_assignments.id_cus','=','works.id')
        ->join('workers','works_assignments.id_worker','=','workers.id')
        ->where('works_assignments.created_at', 'like',$today.'%')
        ->where('works.kind_work','=',0)
        ->whereBetween('works_assignments.status_work',[0,3])
        ->get([
            "works_assignments.id",
            "works_assignments.id_cus",
            "works_assignments.id_worker",
            "works_assignments.id_phu",
            "works_assignments.real_note",
            "works_assignments.spending_total",
            "works_assignments.income_total",
            "works_assignments.bill_imag",
            "works_assignments.status_work",
            "works_assignments.check_in",
            "works_assignments.seri_number",
            "works.work_content",
            "works.date_book",
            "works.street",
            "works.district",
            "works.phone_number",
            "works.image_work_path",
            "works.kind_work",
            "workers.worker_firstname",
            "workers.worker_name",
            "workers.sort_name",
            "workers.add_worker",
        ]
        );
        // Work::where('date_book','=',$today)->where('kind_work','=','0')->where('status_cus','=',1)->get();
        $number = count($dien_nuoc) + count($dien_lanh) + count($do_go ) + count( $nlmt )+ count($xay_dung) + count($tai_xe) + count( $co_khi);
        $dataWorkDone = [
            'dien_nuoc_done'=>$dien_nuoc,
            'dien_lanh_done'=>$dien_lanh,
            'do_go_done'=>$do_go,
            'nlmt_done'=>$nlmt,
            'xay_dung_done'=>$xay_dung,
            'tai_xe_done'=>$tai_xe,
            'co_khi_done'=>$co_khi,
            'dem_lich_done'=>$number,
        ];
        return response()->json( $dataWorkDone);
    }
    public function workAssignWorker(Request $request)
    {
        // return "1111111111111111111111";
        // dd('1111111111111111111111111');
        $request->all();

        $this->validate($request, [
            'id_cus' => 'required',
            'id_worker' => 'required',
        ]);

        $id_cus = $request->get('id_cus');
        $id_worker = $request->get('id_worker');
        $number = count($id_worker);
        // dd($id_worker[0]);

        $work_note =  Work::where('id', '=', $id_cus)
        ->value('work_note');
        // dd($request);
        $kind_worker = Worker::where('id', '=', $id_worker[0]['value'])->value('kind_worker');
        // Update kind work by kind worker
        $work_u_k = Work::where('id', '=', $id_cus)->update(['kind_work'=> $kind_worker,'status_cus'=>1]);
        // dd($id_worker);
        if($number > 1){
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker[0]['value'],
                'id_phu' => $id_worker[1]['value'],
                'real_note' => $work_note,
            ]);
        }
        else
        {
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker[0]['value'],
                'real_note' => $work_note,
            ]);
        }
        $workHas->save();


        // $id_work_has = WorksAssignment::where('id_cus', '=', $id_cus)->where('id_worker', '=', $id_worker)->value('id');

        // insert to new checkin check out
        // $newio =  new WorksAssignment();
        // // $newio -> id_cus = $id_cus;
        // $newio -> id_work_has = $id_work_has;
        // $newio -> save();


        // CheckWorkByAdminController::create($id_work_has);
        // $work = Work::where('id', '=', $id_cus)->update(['status_cus' => 1]);
        // $info_noti_push ='Có Lịch Mới';

        // WorkerController::sentNewWorkToWorker($request->get('id_worker'), $info_noti_push);
        // return redirect()->action('WorkController@home');
        return 'OK';
    }
    public function returnText(Request $request){

        dd($request->all());

    }
}
