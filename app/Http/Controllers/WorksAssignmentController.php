<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\WorksAssignment;
use App\Models\Work;
use App\Models\Worker;
class WorksAssignmentController extends Controller
{
    public function working(Request $request)
    {
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
        $kind_worker = Worker::where('id', '=', $id_worker[0])->value('kind_worker');
        // Update kind work by kind worker
        $work_u_k = Work::where('id', '=', $id_cus)->update(['kind_work'=> $kind_worker]);
        if($number > 1){

        //     $id_phu = $id_worker[0];
        // //    for($i=0; $i<=$number; $i ++)
        // //    {
        // //     $id_phu += ;
        // //    }
        //    dd( $id_phu); 

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
                // 'id_checkin_checkout' => $idCheckInOut,
                'real_note' => $work_note,
            ]);
        }
        $workHas->save();
        

        $id_work_has = WorksAssignment::where('id_cus', '=', $id_cus)->where('id_worker', '=', $id_worker)->value('id');

        // insert to new checkin check out
        $newio =  new WorksAssignment();
        // $newio -> id_cus = $id_cus;
        $newio -> id_work_has = $id_work_has;
        $newio -> save();
       

        // CheckWorkByAdminController::create($id_work_has);
        // $work = Work::where('id', '=', $id_cus)->update(['status_cus' => 1]);
        // $info_noti_push ='Có Lịch Mới';

        // WorkerController::sentNewWorkToWorker($request->get('id_worker'), $info_noti_push);
        // return redirect()->action('WorkController@home');
    }
}
