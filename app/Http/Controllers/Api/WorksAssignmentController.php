<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class WorksAssignmentController extends Controller
{
    public function __invoke()
    {
    }
    public function allWorkAssign(Request $request)
    {
        if ($request->dateCheck) {
            $today = $request->dateCheck;
        } else {
            $today = date('Y-m-d');
        }
        // thông tin điện nước
        $dien_nuoc = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 0)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
                    "workers.worker_firstname",
                    "workers.worker_name",
                    "workers.sort_name",
                    "workers.add_worker",
                ]
            );
        $dien_lanh = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 1)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
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
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 2)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
                    "workers.sort_name",
                    "workers.add_worker",
                ]
            );
        $nlmt = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 3)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
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
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 4)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
                    "workers.sort_name",
                    "workers.add_worker",
                ]
            );
        $tai_xe = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 5)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
                    "workers.sort_name",
                    "workers.add_worker",
                ]
            );
        $co_khi = DB::table('works_assignments')
            ->join('works', 'works_assignments.id_cus', '=', 'works.id')
            ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
            ->where('works_assignments.created_at', 'like', $today . '%')
            ->where('works.kind_work', '=', 6)
            ->whereBetween('works_assignments.status_work', [0, 3])
            ->get(
                [
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
                    "works.name_cus",
                    "workers.sort_name",
                    "workers.add_worker",
                ]
            );

        $number = count($dien_nuoc) + count($dien_lanh) + count($do_go) + count($nlmt) + count($xay_dung) + count($tai_xe) + count($co_khi);
        $dataWorkDone = [
            'dien_nuoc_done' => $dien_nuoc,
            'dien_lanh_done' => $dien_lanh,
            'do_go_done' => $do_go,
            'nlmt_done' => $nlmt,
            'xay_dung_done' => $xay_dung,
            'tai_xe_done' => $tai_xe,
            'co_khi_done' => $co_khi,
            'dem_lich_done' => $number,
        ];
        return response()->json($dataWorkDone);
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
        // dd($id_worker[0]);

        $work_note =  Work::where('id', '=', $id_cus)
            ->value('work_note');
        // dd($request);
        $kind_worker = Worker::where('id', '=', $id_worker[0]['value'])->value('kind_worker');
        // Update kind work by kind worker
        $work_u_k = Work::where('id', '=', $id_cus)->update(['kind_work' => $kind_worker, 'status_cus' => 1]);
        // dd($id_worker);
        if ($number > 1) {
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker[0]['value'],
                'id_phu' => $id_worker[1]['value'],
                'real_note' => $work_note,
            ]);
        } else {
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
    public function returnText(Request $request)
    {

        dd($request->all());
    }
    public function updateWorkAss(Request $request)
    {
        $id_cus =  WorksAssignment::where('id', '=', $request->id)->value('id_cus');
        if ($request->ac) {
            switch ($request->ac) {
                case ('1'):
                    $content = Work::where('id', '=', $id_cus)->update(['work_content' => $request->work_content, 'work_note' => $request->work_note, 'street' => $request->street, 'district' => $request->district, 'phone_number' => $request->phone_number]);
                    if ($request->warranties != null) {
                    }
                    $content = Work::where('id', '=', $id_cus)->update(['work_content' => $request->work_content]);
                    break;
                case ('tobeConti'):
                    $content = Work::where('id', '=', $id_cus)->update(['work_note' => $request->work_note]);
                    break;
                case ('3'):
                    $content = Work::where('id', '=', $id_cus)->update(['street' => $request->street]);
                    break;
                case ('4'):
                    $content = Work::where('id', '=', $id_cus)->update(['district' => $request->district]);
                    break;
                case ('5'):
                    $content = Work::where('id', '=', $id_cus)->update(['phone_number' => $request->phone_number]);
                    break;
            }
            if (isset($content)) {
                return response()->json('Update Work done !!! ');
            }
            return response()->json('Update Work fail !!!!!!!!!');
        }
        return response()->json('Non Action !');
    }
    public function insertCancleBook(Request $request)
    {
        $id_cus = WorksAssignment::where('id', '=', $request->id)->value('id_cus');
        $up1 = WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 5]);
        $up = Work::where('id', '=', $id_cus)->update(['status_cus' => 2, 'work_note' => $request->work_note, 'members_read' => $request->id_auth]);

        if ($up) {
            return 'Delete work done !';
        }
        return  'Delete Failse !';
    }
    public function continueWorkAss(Request $request)
    {
        if ($request->ac == 1) {
            // update bảng đã phân
            // lấy id works sau đó đổi thông tin trạng thái, thêm nội dung ghi chú vào bảng work
            $note = WorksAssignment::where('id', '=', $request->id)->value('real_note');
            if ($note != null) {
                $note = $note . ' - ' . date('d/m');
            } else {
                $sub = Carbon::now()->subDay(1)->format('d/m');
                $note = 'Đã làm ngày : ' . $sub;
            }
            $up =  WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 1, 'real_note' => $note]);
            return response()->json('Update continue work !!!');
        } else {
            $id_cus = $request->id_cus;
            $up_work = Work::where('id', '=', $id_cus)->update([
                'work_content' => $request->work_content,
                'date_book' => $request->date_book,
                'phone_number' => $request->phone_number,
                'district' => $request->district,
                'members_read' => $request->member_read,
                'street' => $request->street,
                'name_cus' => $request->name_cus,
            ]);

            if ($request->hasFile('bill_imag')) {
                // dd($request->all());
                $files = '';
                foreach ($request->file('bill_imag') as $file) {
                    $name = $request->id . '-' . time() . rand(10, 100) . '.' . $file->extension();
                    $file->move('assets/images/work_assignment', $name);
                    $files = $files . 'assets/images/work_assignment/' . $name . ',';
                }
                $serializedArr = json_encode($files);

                $up_work_ass =  WorksAssignment::where('id', '=', $request->id)
                    ->update([
                        'status_work' => 2,
                        'real_note' => $request->real_note,
                        'spending_total' => $request->spending_total,
                        'income_total' => $request->income_total,
                        'bill_imag' => $serializedArr,
                        'seri_number' => $request->seri_number,
                        'work_done_date' => date('d-m-Y '),
                    ]);
                    return response()->json('Update work with image !!!');
            } else {
                $up_work_ass =  WorksAssignment::where('id', '=', $request->id)
                    ->update([
                        'status_work' => 2,
                        'real_note' => $request->real_note,
                        'spending_total' => $request->spending_total,
                        'income_total' => $request->income_total,
                        // 'bill_imag',
                        'seri_number' => $request->seri_number,
                        'work_done_date' => date('d-m-Y '),
                    ]);
                    return response()->json('Update work none image !!!');
            }





        }
    }
}
