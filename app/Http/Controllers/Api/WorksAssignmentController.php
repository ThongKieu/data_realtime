<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\Web\QuoteFlowController;
use App\Http\Controllers\Controller;
use App\Models\Warranties;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

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
            ->orderBy('workers.worker_code', 'asc')
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
                    "works_assignments.seri_imag",
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
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "workers.worker_code",
                    "workers.worker_address", "workers.worker_phone_company",
                    "works_assignments.status_admin_check",
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
                    "works_assignments.seri_imag",
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
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "workers.worker_code",
                    "workers.worker_address",
                    "workers.worker_phone_company",
                    "works_assignments.status_admin_check",
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
                    "works_assignments.seri_imag",
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
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "works.name_cus",
                    "workers.worker_code",
                    "workers.worker_address", "workers.worker_phone_company",
                    "works_assignments.status_admin_check",
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
                    "works_assignments.seri_imag",
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
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "workers.worker_code",
                    "workers.worker_address", "workers.worker_phone_company",
                    "works_assignments.status_admin_check",
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
                    "works_assignments.seri_imag",
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
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "works.name_cus",
                    "workers.worker_code",
                    "workers.worker_address", "workers.worker_phone_company",
                    "works_assignments.status_admin_check",
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
                    "works_assignments.seri_imag",
                    "works_assignments.status_work",
                    "works_assignments.status_admin_check",
                    "works_assignments.check_in",
                    "works_assignments.seri_number",
                    "works.work_content",
                    "works.date_book",
                    "works.street",
                    "works.district",
                    "works.phone_number",
                    "works.image_work_path",
                    "works.kind_work",
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "works.name_cus",
                    "workers.worker_code",
                    "workers.worker_address", "workers.worker_phone_company",
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
                    "works_assignments.seri_imag",
                    "works_assignments.status_work",
                    "works_assignments.check_in",
                    "works_assignments.seri_number",
                    "works_assignments.status_admin_check",
                    "works.work_content",
                    "works.date_book",
                    "works.street",
                    "works.district",
                    "works.phone_number",
                    "works.image_work_path",
                    "works.kind_work",
                    "workers.worker_full_name",
                    // "workers.worker_name",
                    "works.name_cus",
                    "workers.worker_code",
                    "workers.worker_address",
                    "workers.worker_phone_company",
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
        $id_phu = $request->get('id_phu');
        // dd($id_worker[0]);

        $work_note = Work::where('id', '=', $id_cus)
            ->value('work_note');

        // dd($request);
        $worker_kind = Worker::where('id', '=', $id_worker)->value('worker_kind');
        // Update kind work by kind worker
        $work_u_k = Work::where('id', '=', $id_cus)->update(['kind_work' => $worker_kind, 'status_cus' => 1, 'date_book' => date('Y-m-d')]);
        if ($id_phu != null) {
            // dd(json_encode($id_phu));
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker,
                'id_phu' => json_encode($id_phu),
                'real_note' => $work_note,
                'admin_check' => $request->auth_id,
                'kind_work_assign' => $worker_kind,
            ]);
        } else {
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker,
                'real_note' => $work_note,
                'admin_check' => $request->auth_id,
                'kind_work_assign' => $worker_kind,
            ]);
        }
        $workHas->save();

        $id_work_has = WorksAssignment::where('id_cus', '=', $id_cus)->where('id_worker', '=', $id_worker)->value('id');
        return 'OK';
    }
    public function returnWorkFromAssignment(Request $request)
    {
        if ($request->id == null || $request->id_cus == null || $request->real_note == null || $request->worker_name == null) {
            return -1;
        } else {
            $note = $request->real_note . '-' . $request->worker_name . '- Đã Trả';
            Work::where('id', '=', $request->id_cus)->update(['status_cus' => 0, 'work_note' => $note]);
            WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 4]);
            return 1;
        }

    }
    public function cancelWorkFromAssignment(Request $request)
    {
        if ($request->id == null || $request->id_cus == null || $request->real_note == null || $request->auth_id == null) {
            return -1;
        } else {
            $note = $request->real_note;
            Work::where('id', '=', $request->id_cus)->update(['status_cus' => 2, 'work_note' => $note, 'member_read' => $request->auth_id]);
            WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 5, 'real_note' => $note]);
            return 1;
        }
    }

    public function insertCancleBook(Request $request)
    {
        $id_cus = WorksAssignment::where('id', '=', $request->id)->value('id_cus');
        $up1 = WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 5]);
        $up = Work::where('id', '=', $id_cus)->update(['status_cus' => 2, 'work_note' => $request->work_note, 'member_read' => $request->auth_id]);

        if ($up) {
            return 'Delete work done !';
        }
        return 'Delete Failed !';
    }
    public function insertQuoteFlow(Request $request)
    {

        $up1 = WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 3]);
        $up = QuoteFlowController::addAuto($request->id, $request->auth_id);

        if ($up == 200) {
            return 'Delete work done !';
        }
        return 'Delete Failse !';
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
            $up = WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 1, 'real_note' => $note]);
            return response()->json('Update continue work !!!');
        } else {
            $id_cus = $request->id_cus;
            $up_work = Work::where('id', '=', $id_cus)->update([
                'work_content' => $request->work_content,
                'date_book' => $request->date_book,
                'phone_number' => $request->phone_number,
                'district' => $request->district,
                'member_read' => $request->member_read,
                'street' => $request->street,
                'name_cus' => $request->name_cus,
            ]);
            // dd($request->hasFile('seri_imag'));
            if ($request->hasFile('seri_imag')) {
                $file_na = '';
                foreach ($request->file('seri_imag') as $files_seri) {
                    $name_seri = $request->id . '-' . time() . rand(10, 100) . '.' . $files_seri->extension();
                    $files_seri->move('assets/images/work_assignment/' . $request->id . '/seri_imag', $name_seri);
                    $file_na = $file_na . 'assets/images/work_assignment/' . $request->id . '/seri_imag/' . $name_seri . ',';
                    dd($file_na);
                }
                // $serializedArr1 = json_encode($file_na);

                $check_ima = WorksAssignment::where('id', '=', $request->id)->value('seri_imag');
                if ($check_ima != null) {
                    $file_na = $check_ima . $file_na;
                    WorksAssignment::where('id', '=', $request->id)->update(['seri_imag' => $file_na]);
                } else {
                    WorksAssignment::where('id', '=', $request->id)->update(['seri_imag' => $file_na]);
                }
            }

            if ($request->hasFile('bill_imag')) {
                // dd($request->all());
                $files = '';
                foreach ($request->file('bill_imag') as $file) {
                    $name = $request->id . '-' . time() . rand(10, 100) . '.' . $file->extension();
                    $file->move('assets/images/work_assignment/' . $request->id, $name);
                    $files = $files . 'assets/images/work_assignment/' . $request->id . '/' . $name . ',';
                    dd($files);
                }
                // $serializedArr = json_encode($files);
                // dd($serializedArr);
                $check_ima = WorksAssignment::where('id', '=', $request->id)->value('bill_imag');
                if ($check_ima != null) {
                    $files = $check_ima . $files;
                    WorksAssignment::where('id', '=', $request->id)->update(['bill_imag' => $files]);
                } else {
                    WorksAssignment::where('id', '=', $request->id)->update(['bill_imag' => $files]);
                }
                $up_work_ass = WorksAssignment::where('id', '=', $request->id)
                    ->update([
                        'status_work' => 2,
                        'real_note' => $request->real_note,
                        'spending_total' => $request->spending_total,
                        'income_total' => $request->income_total,
                        'seri_number' => $request->seri_number,
                        'work_done_date' => date('d-m-Y '),
                    ]);
                return response()->json('Update work with image !!! ');
            } else {
                $up_work_ass = WorksAssignment::where('id', '=', $request->id)
                    ->update([
                        'status_work' => 2,
                        'real_note' => $request->real_note,
                        'spending_total' => $request->spending_total,
                        'income_total' => $request->income_total,
                        'seri_number' => $request->seri_number,
                        'work_done_date' => date('d-m-Y '),
                    ]);
                // if($request->datainput != null || $request->datainput != '')
                // {
                //     dd($request->datainput);

                // }
                return response()->json('Update work none image !!!');
            }
        }
    }
    public function checkWorkByAdmin(Request $request)
    {
        // dd($request->hasFile('seri_imag_new'));
        if ($request->ac != null) {
            $per = DB::table('users')->where('id', '=', $request->auth_id)->value('permission');
            if ($per == 1) {
                switch ($request->ac) {
                    case 1:
                        // thay đổi thông tin bảo hành
                        // Warranties::where('id', '=', $request->id)->update(['unit' => $request->unit,'warranty_time'=>$request->warranty_time,'warranty_info'=>$request->warranty_info]);
                        if ($request->id_del_warranty) {
                            $num = Warranties::where('id', '=', $request->id_del_warranty)->delete();
                            return 'Del warranties';
                        } else {
                            $num = Warranties::where('id', '=', $request->id_work_has)->get('id');
                            $a = $request->info_warranties;
                            // dd( $a);

                            if (count($num) == 0) {
                                for ($i = 0; $i < count($a); $i++)
                                // them moi
                                {
                                    $new = new Warranties([
                                        'id_work_has' => $request->id_work_has,
                                        'warranty_time' => $a[$i]['warranty_time'],
                                        'warranty_info' => $a[$i]['warranty_info'],
                                        'unit' => $a[$i]['unit'],
                                    ]);
                                    $new->save();
                                }
                            } else {
                                if (count($num) == count($a)) {
                                    for ($i = 0; $i < count($a); $i++)
                                    // them moi
                                    {
                                        Warranties::where('id', '=', $a[$i]['id_warranty'])->update(['unit' => $a[$i]['unit'], 'warranty_time' => $a[$i]['warranty_time'], 'warranty_info' => $a[$i]['warranty_info']]);

                                    }
                                }
                                if (count($num) < count($a)) {
                                    for ($i = 0; $i < count($a); $i++)
                                    // them moi
                                    {
                                        $c = Warranties::where('id', '=', $a[$i]['id_warranty'])->update(['unit' => $a[$i]['unit'], 'warranty_time' => $a[$i]['warranty_time'], 'warranty_info' => $a[$i]['warranty_info']]);
                                        if (!$c) {
                                            $new = new Warranties([
                                                'id_work_has' => $request->id_work_has,
                                                'warranty_time' => $a[$i]['warranty_time'],
                                                'warranty_info' => $a[$i]['warranty_info'],
                                                'unit' => $a[$i]['unit'],
                                            ]);
                                            $new->save();
                                            $new->save();
                                        }
                                    }
                                }

                            }
                        }
                        return 'Update warranties';
                    case 2:
                        $bill_imag = WorksAssignment::where('id', '=', $request->id)->value('bill_imag');
                        $set_update_bill = '';
                        $path = '';
                        // Xóa Hình
                        if ($request->bill_imag_del) {
                            $set_update_bill = explode($request->bill_imag_del, $bill_imag);
                            for ($i = 0; $i < count($set_update_bill); $i++) {
                                if ($request->bill_imag_del == $set_update_bill[$i]) {
                                    $set_update_bill[$i] = '';
                                }
                                $path = $path . $set_update_bill[$i] . ',';
                            }
                            WorksAssignment::where('id', '=', $request->id)->update(['bill_imag' => $path]);

                            if (File::exists(public_path($request->bill_imag_del))) {
                                File::delete(public_path($request->bill_imag_del));
                                // Thông báo rằng hình đã được xóa
                                return "Update bill Image Done!";
                            } else {
                                // Thông báo nếu không tìm thấy hình ảnh
                                return "Không tìm thấy hình ảnh!";
                            }
                        } else {
                            //Thêm  mới 1 hoặc nhiều hình
                            //  dd($request->all());
                            if ($request->hasFile('bill_imag_new')) {
                                $images = $request->file('bill_imag_new');
                                //  dd($images);
                                foreach ($images as $image) {
                                    $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                                    $image->move('assets/images/work_assignment/' . $request->id . '/bill_imag', $name);
                                    $bill_imag .= 'assets/images/work_assignment/' . $request->id . '/bill_imag/' . $name . ',';
                                    // dd('11111111111111');
                                }
                                WorksAssignment::where('id', '=', $request->id)->update(['bill_imag' => $bill_imag]);
                                return "Update bill Image Done!";
                            }

                            return "Update bill Image Fails!";
                        }
                    case 3:
                        $seri_imag = WorksAssignment::where('id', '=', $request->id)->value('seri_imag');
                        $set_update_seri = '';
                        $path = '';
                        // Xóa Hình
                        if ($request->seri_imag_del) {
                            $set_update_seri = explode($request->seri_imag_del, $seri_imag);
                            for ($i = 0; $i < count($set_update_seri); $i++) {
                                if ($request->seri_imag_del == $set_update_seri[$i]) {
                                    $set_update_seri[$i] = '';
                                }
                                $path = $path . $set_update_seri[$i] . ',';
                            }
                            WorksAssignment::where('id', '=', $request->id)->update(['seri_imag' => $path]);

                            if (File::exists(public_path($request->seri_imag_del))) {
                                File::delete(public_path($request->seri_imag_del));
                                // Thông báo rằng hình đã được xóa
                                return "Update Seri Image Done!";
                            } else {
                                // Thông báo nếu không tìm thấy hình ảnh
                                return "Không tìm thấy hình ảnh!";
                            }
                        } else {
                            //Thêm  mới 1 hoặc nhiều hình
                            //  dd($request->all());
                            if ($request->hasFile('seri_imag_new')) {
                                $images = $request->file('seri_imag_new');
                                //  dd($images);
                                foreach ($images as $image) {
                                    $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                                    $image->move('assets/images/work_assignment/' . $request->id . '/seri_imag', $name);
                                    $seri_imag .= 'assets/images/work_assignment/' . $request->id . '/seri_imag/' . $name . ',';
                                    // dd('11111111111111');
                                }
                                WorksAssignment::where('id', '=', $request->id)->update(['seri_imag' => $seri_imag]);
                                return "Update Seri Image Done!";
                            }

                            return "Update Seri Image Fails!";
                        }

                    // case 4:
                    //     //Work content
                    //
                    //     return 'Update Work_content';
                    // case 5:
                    //     //Phone number
                    //     Work::where('id', '=', $request->id_cus)->update(['phone_number' => $request->phone_number]);
                    //     return 'Update phone_number';
                    // case 6:
                    //     //Address
                    //     Work::where('id', '=', $request->id_cus)->update(['street' => $request->street]);
                    //     return 'Update street';
                    // case 7:
                    //     //District
                    //     Work::where('id', '=', $request->id_cus)->update(['district' => $request->district]);
                    //     return 'Update district';
                    // case 8:
                    //     //Name Cus
                    //     Work::where('id', '=', $request->id_cus)->update(['name_cus' => $request->name_cus]);
                    //     return 'Update name_cus';
                    // case 9:
                    //     //real_note
                    //     WorksAssignment::where('id', '=', $request->id)->update(['real_note' => $request->real_note]);
                    //     return 'Update Work_note';
                    // case 10:
                    //     // Incoming money
                    //     // dd($request->all());
                    //     WorksAssignment::where('id', '=', $request->id)->update(['income_total' => $request->income_total]);
                    //     return 'Update income_total';
                    // case 11:
                    //     // Spend money
                    //     WorksAssignment::where('id', '=', $request->id)->update(['spending_total' => $request->spending_total]);
                    //     return 'Update spending_total';
                    // case 12:
                    //     // Update seri number
                    //     WorksAssignment::where('id', '=', $request->id)->update(['seri_number' => $request->seri_number]);
                    //     return 'Update Seri';
                    case 13:
                        // Admin Check

                        $data = $request->data;

                        Work::where('id', '=', $request->id_cus)->update(['work_content' => $data['work_content'], 'phone_number' => $data['phone_number'], 'street' => $data['street'], 'district' => $data['district'], 'name_cus' => $data['name_cus']]);
                        WorksAssignment::where('id', '=', $request->id)->update(['real_note' => $data['real_note'], 'income_total' => $data['income_total'], 'spending_total' => $data['spending_total'], 'seri_number' => $data['seri_number'], 'status_admin_check' => 1]);

                        return 'Admin Check';
                    default:
                        return 'Done With None Update !';
                }
            }
            return "101 : Permission Denied !!!!";
        } else {
            return "Can't update!";
        }
    }

    // Return Work is assign
    public function returnWork(Request $request)
    {
        $id_work_as = $request->id_work_as;
        $id_cus = $request->id_cus;
        $real_note = $request->real_note;
        $id_worker = $request->id_worker;

        $up_w_a = WorksAssignment::where('id', '=', $id_work_as)->update(['status_work' => 4]);
        $w_e = Worker::where('id', '=', $id_worker)->value('worker_kind');
        $up_w_k = Work::where('id', '=', $id_cus)->update(['kind_work' => $w_e, 'member_read' => $request->auth_id]);

        if ($request->id_phu) {

            $w_a_n = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker,
                'id_phu' => json_encode($request->id_phu),
                'real_note' => $real_note,
            ]);
        } else {
            $w_a_n = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker,
                'real_note' => $real_note,
            ]);

        }

        $w_a_n->save();

        return response()->json('Update Done');

    }
    public function setActive(Request $request)
    {
        if ($request->id_work_ass && $request->ac == 2) {
            WorksAssignment::where('id', '=', $request->id_work_ass)->update(['flag_check' => 1, 'admin_check' => $request->auth_id]);
            return 'Mark Disable !';
        } else {
            WorksAssignment::where('id', '=', $request->id_work_ass)->update(['flag_check' => 0, 'admin_check' => $request->auth_id]);

            return 'Mark Non disable !';
        }
        return 'Fails!!!!!!!!!!!!!!!!';
    }
}
