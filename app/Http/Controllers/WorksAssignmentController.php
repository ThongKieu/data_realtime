<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorksAssignment;
use App\Models\Work;
use App\Models\Worker;
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
        $dien_nuoc = WorksAssignment::where('created_at', 'like',$today.'%')->whereBetween('status_work',[0,3])->get();
        // Work::where('date_book','=',$today)->where('kind_work','=','0')->where('status_cus','=',1)->get();




        // $dien_lanh =    Work::where('date_book','=',$today)->where('kind_work','=','1')->where('status_cus','=',1)->get();
        // $do_go     =    Work::where('date_book','=',$today)->where('kind_work','=','2')->where('status_cus','=',1)->get();
        // $nlmt      =    Work::where('date_book','=',$today)->where('kind_work','=','3')->where('status_cus','=',1)->get();
        // $xay_dung  =    Work::where('date_book','=',$today)->where('kind_work','=','4')->where('status_cus','=',1)->get();
        // $tai_xe    =    Work::where('date_book','=',$today)->where('kind_work','=','5')->where('status_cus','=',1)->get();
        // $co_khi    =    Work::where('date_book','=',$today)->where('kind_work','=','6')->where('status_cus','=',1)->get();
        // $number = count($dien_nuoc) + count($dien_lanh) + count($do_go ) + count( $nlmt )+ count($xay_dung) + count($tai_xe) + count( $co_khi);
        $dataWorkDone = [
            'dien_nuoc_done'=>$dien_nuoc,
            // 'dien_lanh_done'=>$dien_lanh,
            // 'do_go_done'=>$do_go,
            // 'nlmt_done'=>$nlmt,
            // 'xay_dung_done'=>$xay_dung,
            // 'tai_xe_done'=>$tai_xe,
            // 'co_khi_done'=>$co_khi,
            // 'dem_lich_done'=>$number,
        ];
        return response()->json( $dataWorkDone);
    }
    public function workAssignWorker(Request $request)
    {
        $request->all();

        $this->validate($request, [
            'id_cus' => 'required',
            'id_worker' => 'required',
        ]);

        $id_cus = $request->get('id_cus');
        $id_worker = $request->get('id_worker');
        $number = count($id_worker);
        dd($id_worker[0]);
        $work_note =  Work::where('id', '=', $id_cus)
        ->value('work_note');
        // dd($request);
        $kind_worker = Worker::where('id', '=', $id_worker[0])->value('kind_worker');
        // Update kind work by kind worker
        $work_u_k = Work::where('id', '=', $id_cus)->update(['kind_work'=> $kind_worker]);
        if($number > 1){
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker[0],
                'id_phu' => $id_worker[1],
                'real_note' => $work_note,
            ]);
        }
        else
        {
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker[0],
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
}
