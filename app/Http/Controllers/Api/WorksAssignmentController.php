<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CodeWorkerKind;
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
        $workerKinds = CodeWorkerKind::where('id', '>', 0)->where('status_code_worker', '=', 1)->get('kind_worker');

        // dd( );
        $data_json = [];
        foreach ($workerKinds as $kindId => $kindWorker) {
            $data_json[$kindId]['kind_worker'] = new \stdClass();
            $data_json[$kindId]['kind_worker']->nameKind = $kindWorker->kind_worker;
            $data_json[$kindId]['data'] = DB::table('works_assignments')
                ->join('works', 'works_assignments.id_cus', '=', 'works.id')
                ->join('workers', 'works_assignments.id_worker', '=', 'workers.id')
                ->where('works_assignments.created_at', 'like', $today . '%')
                ->where('works.kind_work', '=', $kindId + 1)
                ->whereBetween('works_assignments.status_work', [0, 3])
                ->orderBy('workers.worker_code', 'asc')
                ->get([
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
                    "workers.worker_code",
                    "workers.worker_address",
                    "workers.worker_phone_company",
                    "works_assignments.status_admin_check",
                    "works_assignments.flag_check",
                    "works_assignments.his_work",
                ]);
            // dd($data_json[$kindId]['data']);
            // Lấy thông tin bảo hành cho mỗi công việc được giao
            foreach ($data_json[$kindId]['data'] as $item) {
                $item->warranties = WorksAssignmentController::getWarrantiesById($item->id);

            }
            $data_json[$kindId]['kind_worker']->numberOfWork = count($data_json[$kindId]['data']);
            // dd($data_json[$kindId]['data']);
        }

        return response()->json($data_json);

    }
    public static function getWarrantiesById($id)
    {
        $warranty = Warranties::where('id_work_has', '=', $id)->get(['id', 'id_work_has', 'warranty_time', 'warranty_info', 'unit']);

        if (count($warranty) > 0) {
            return $warranty;
        } else {
            return [];
        }

    }
    public function workAssignWorker(Request $request)
    {

        $request->all();
        // dd($request->all());

        $this->validate($request, [
            'id_cus' => 'required',
            'id_worker' => 'required',
        ]);

        $id_cus = $request->get('id_cus');
        $id_worker = $request->get('id_worker');
        $id_phu = $request->get('id_phu');
        $his_work = $request->his_work;
        // dd($his_work);
        $work_note = Work::where('id', '=', $id_cus)
            ->value('work_note');
        $worker_kind = Worker::where('id', '=', $id_worker)->value('worker_kind');
        // Update kind work by kind worker
        $work_u_k = Work::where('id', '=', $id_cus)->update(['kind_work' => $worker_kind, 'status_cus' => 1, 'date_book' => date('Y-m-d')]);
        if ($id_phu != null) {
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker,
                'id_phu' => json_encode($id_phu),
                'real_note' => $work_note,
                'admin_check' => $request->auth_id,
                'kind_work_assign' => $worker_kind,
                'his_work' => $his_work,
            ]);
        } else {
            $workHas = new WorksAssignment([
                'id_cus' => $id_cus,
                'id_worker' => $id_worker,
                'real_note' => $work_note,
                'admin_check' => $request->auth_id,
                'kind_work_assign' => $worker_kind,
                'his_work' => $his_work,
            ]);
        }

        $workHas->save();

        // $id_work_has = WorksAssignment::where('id_cus', '=', $id_cus)->where('id_worker', '=', $id_worker)->value('id');
        return 'OK';
    }
    public function returnWorkFromAssignment(Request $request)
    { //
        if ($request->id == null || $request->id_cus == null || $request->worker_name == null || $request->real_note == null) {
            return -1;
        } else {
            $note = $request->real_note . '-' . $request->worker_name . '- Đã Trả';
            Work::where('id', '=', $request->id_cus)->update(['status_cus' => 0, 'work_note' => $note]);
            WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 4]);
            // Thêm phần lịch sử thay đổi
            WorksAssignmentController::insertHisWork($request->id, $request->his_work);
            if (isset($request->from_app)) {
                NoticationAllController::create('3', $note, '');
            }
            return 1;
        }

    }

    public function cancelWorkFromAssignment(Request $request)
    {
        if ($request->id == null || $request->id_cus == null || $request->auth_id == null) {
            return -1;
        } else {
            $note = $request->real_note;
            Work::where('id', '=', $request->id_cus)->update(['status_cus' => 2, 'work_note' => $note, 'member_read' => $request->auth_id]);
            WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 5, 'real_note' => $note]);
            WorksAssignmentController::insertHisWork($request->id, $request->his_work);
            if (isset($request->from_app)) {
                NoticationAllController::create('3', $request->content, '');
            }
            return 1;
        }
    }
    // insertQuoteWorkFromAssignment
    public function insertQuoteWorkFromAssignment(Request $request)
    {
        if ($request->id == null || $request->id_cus == null || $request->real_note == null || $request->auth_id == null) {
            return -1;
        } else {
            $seri_imag = '';
            $ac = $request->ac;
            WorksAssignmentController::insertHisWork($request->id, $request->his_work);
            if ($ac == 1) {
                //Báo giá nhanh ( có giá ít gửi luôn cho khách - Chụp hình hoặc k chụp hình)
                if ($request->hasFile('image_work_path')) {
                    $images = $request->file('image_work_path');
                    // dd($images);
                    foreach ($images as $image) {
                        $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                        $image->move('assets/images/work_assignment/' . $request->id . '/quote', $name);
                        $seri_imag .= 'assets/images/work_assignment/' . $request->id . '/quote/' . $name . ',';
                    }
                }
                $info_quote = $request->real_note;
                $income_total = $request->income_total;
                $update = WorksAssignment::where('id', '=', $request->id)->update([
                    'status_work' => 3,
                    'income_total' => $income_total,
                    'real_note' => $info_quote,
                    'bill_imag' => $seri_imag,
                ]);
                if ($update) {
                    return 'true';
                } else {
                    return 'failed';
                }

            } elseif ($ac == 2) {
                //Khảo sát chờ báo giá ( tạo file PDF theo trường  -> gửi cho khách link file qua zalo hoặc SMS
                //php Gửi số khối lượng báo giá để tạo bảng ; nội dung, đơn vị tính, khối lượng, giá thành, thành tiền, bảo hành

            } elseif ($ac == 3) {
                // Thợ ks mà không làm được cty gửi cho thợ khác báo
            } else {
                return 'Fail !!!!!!!!!!!!';
            }

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
    public function insertQuoteWork(Request $request)
    {

        $seri_imag = '';
        if ($request->hasFile('image_work_path')) {
            $images = $request->file('image_work_path');
            // dd($images);
            foreach ($images as $image) {
                $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/work_assignment/' . $request->id . '/quote', $name);
                $seri_imag .= 'assets/images/work_assignment/' . $request->id . '/quote/' . $name . ',';
            }
        }
        $update = WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 3, 'bill_imag' => $seri_imag]);
        if ($update) {
            return 'true';
        } else {
            return 'failed';
        }
    }
    public function continueWorkAss(Request $request)
    {
        // dd($request->all());
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

            WorksAssignmentController::insertHisWork($request->id, $request->his_work);
            //id_work, id_worker, id_phu
            $created_at = Carbon::tomorrow('Asia/Ho_Chi_Minh');

            $workContinue = new WorksAssignment([
                'id_cus' => $request->id_cus,
                'id_worker' => $request->id_worker,
                'id_phu' => $request->id_phu,
                'real_note' => $note,
                'created_at' => $created_at,
            ]);

            $workContinue->save();
            if ($workContinue) {
                return 1;
            } else {
                return 0;
            }
        } else {
            $id_cus = $request->id_cus;
            // dd($request->all());
            WorksAssignmentController::insertHisWork($request->id, $request->his_work);
            if (count((json_decode($request->warranty))) > 0) {
                $warranty = json_decode($request->warranty);
                foreach ($warranty as $item) {
                    if ($item->warranty_time != 0) {
                        WarrantiesController::insertWarrantiesFix($request->id, $item->warranty_time, $item->warranty_info, $item->unit);
                    }

                }

            }
            $up_work = Work::where('id', '=', $id_cus)->update([
                'work_content' => $request->work_content,
                'date_book' => $request->date_book,
                'phone_number' => $request->phone_number,
                'district' => $request->district,
                'member_read' => $request->member_read,
                'street' => $request->street,
                'name_cus' => $request->name_cus,
            ]);

            if ($request->hasFile('seri_imag')) {
                $file_na = '';
                foreach ($request->file('seri_imag') as $files_seri) {
                    $name_seri = $request->id . '-' . time() . rand(10, 100) . '.' . $files_seri->extension();
                    $files_seri->move('assets/images/work_assignment/' . $request->id . '/seri_imag', $name_seri);
                    $file_na = $file_na . 'assets/images/work_assignment/' . $request->id . '/seri_imag/' . $name_seri . ',';
                }
                // $serializedArr1 = json_encode($file_na);
                // dd($file_na);
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
                        'work_done_date' => date('Y-m-d'),
                    ]);
                return response()->json('Update work with image !!!');
            } else {
                $up_work_ass = WorksAssignment::where('id', '=', $request->id)
                    ->update([
                        'status_work' => 2,
                        'real_note' => $request->real_note,
                        'spending_total' => $request->spending_total,
                        'income_total' => $request->income_total,
                        'seri_number' => $request->seri_number,
                        'work_done_date' => date('Y-m-d'),

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
            if ($per == 1 || $per == 0) {
                switch ($request->ac) {
                    case 1:
                        // thay đổi thông tin bảo hành
                        // Warranties::where('id', '=', $request->id)->update(['unit' => $request->unit,'warranty_time'=>$request->warranty_time,'warranty_info'=>$request->warranty_info]);
                        if ($request->id_del_warranty) {
                            // dd($request->id_del_warranty);
                            for ($i = 0; $i < count($request->id_del_warranty); $i++) {
                                $num = Warranties::where('id', '=', $request->id_del_warranty[$i])->delete();
                            }
                            return 'Del warranties';
                        } else {

                            $a = $request->info_warranties;
                            $num = Warranties::where('id_work_has', '=', $request->id_work_has)->get('id');
                            if (count($num) == count($a)) { // Sửa thông tin lịch bảo hành
                                for ($i = 0; $i < count($a); $i++) {
                                    Warranties::where('id', '=', $a[$i]['id'])->update(['unit' => $a[$i]['unit'], 'warranty_time' => $a[$i]['warranty_time'], 'warranty_info' => $a[$i]['warranty_info']]);
                                }
                                return 'Sua thanh cong';
                            } else {
                                $n = count($request->info_warranties);
                                // dd(count($num));

                                for ($i = 0; $i < $n; $i++) {
                                    if ($request->info_warranties[$i]['warranty_create'] == 1) {
                                        $new = new Warranties([
                                            'id_work_has' => $request->id_work_has,
                                            'warranty_time' => $request->info_warranties[$i]['warranty_time'],
                                            'warranty_info' => $request->info_warranties[$i]['warranty_info'],
                                            'unit' => $request->info_warranties[$i]['unit'],
                                        ]);
                                        $new->save();
                                    } else {
                                        Warranties::where('id', '=', $a[$i]['id'])->update(['unit' => $a[$i]['unit'], 'warranty_time' => $a[$i]['warranty_time'], 'warranty_info' => $a[$i]['warranty_info']]);
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
                            if ($request->hasFile('bill_imag_new')) {
                                $images = $request->file('bill_imag_new');
                                //  dd($images);
                                foreach ($images as $image) {
                                    $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                                    $image->move('assets/images/work_assignment/' . $request->id . '/bill_imag', $name);
                                    $bill_imag .= 'assets/images/work_assignment/' . $request->id . '/bill_imag/' . $name . ',';
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
                    case 13:
                        // Admin Check
                        $data = $request->data;
                        WorksAssignmentController::insertHisWork($request->id, $request->his_work);
                        // dd($$request->all())
                        Work::where('id', '=', $request->id_cus)->update(['work_content' => $data['work_content'], 'phone_number' => $data['phone_number'], 'street' => $data['street'], 'district' => $data['district'], 'name_cus' => $data['name_cus']]);

                        WorksAssignment::where('id', '=', $request->id)->update(['real_note' => $data['real_note'], 'income_total' => $data['income_total'], 'spending_total' => $data['spending_total'], 'seri_number' => $data['seri_number'], 'status_admin_check' => 1]);

                        ReportWorkerController::setReportDay($data['id_worker'], date('Y-m-d'), $data['income_total'], $data['spending_total']);
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
        $id_work_has = $request->id_work_has;
        $id_cus = $request->id_cus;
        $real_note = $request->real_note;
        $id_worker = $request->id_worker;

        $up_w_a = WorksAssignment::where('id', '=', $id_work_has)->update(['status_work' => 4]);
        $w_e = Worker::where('id', '=', $id_worker)->value('worker_kind');
        $up_w_k = Work::where('id', '=', $id_cus)->update(['kind_work' => $w_e, 'member_read' => $request->auth_id]);
        // Thêm phần lịch sử thay đổi
        WorksAssignmentController::insertHisWork($id_work_has, $request->his_work);
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
    // lich khao sat hoac bao gia
    public function insertQuoteFlow(Request $request)
    {
        $up1 = WorksAssignment::where('id', '=', $request->id)->update(['status_work' => 3]);
        // dd($up1);
        if ($up1 == 1) {

            $seri_imag = '';

            if ($request->hasFile('image_work_path')) {
                $images = $request->file('image_work_path');
                // dd($images);
                foreach ($images as $image) {
                    $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                    $image->move('assets/images/work_assignment/' . $request->id . '/quote', $name);
                    $seri_imag .= 'assets/images/work_assignment/' . $request->id . '/quote/' . $name . ',';
                }
            }

            // dd($seri_imag);
            $up = WorksAssignment::where('id', '=', $request->id)->update(['bill_imag' => $seri_imag]);

            if ($up == 1) {
                return 'Delete work done !';
            }
            return 'Lỗi !!!!!!!!!';
        } else {
            return 'Không tìm thấy';
        }
        //      $seri_imag = '';
        //         $ac = $request->ac ;
        //         if($ac == 1)
        //         {
        //             //Báo giá nhanh ( có giá ít gửi luôn cho khách - Chụp hình hoặc k chụp hình)
        //             if ($request->hasFile('image_work_path')) {
        //                 $images = $request->file('image_work_path');
        //                 // dd($images);
        //                 foreach ($images as $image) {
        //                     $name = $request->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
        //                     $image->move('assets/images/work_assignment/' . $request->id . '/quote', $name);
        //                     $seri_imag .= 'assets/images/work_assignment/' . $request->id . '/quote/' . $name . ',';
        //                 }
        //             }
        //             $info_quote = $request->info_quote;
        //             $income_total =  $request->income_total;
        //             $update = WorksAssignment::where('id', '=', $request->id)->update([
        //                 'status_work' => 3,
        //                 'income_total' => $income_total,
        //                 'real_note' => $info_quote,
        //                 'bill_imag' => $seri_imag
        //                 ]);
        //             if ($update) {
        //                 return 'true';
        //             } else {
        //                 return 'failed';
        //             }

        //         }
        //         elseif($ac == 2)
        //         {
        //             //Khảo sát chờ báo giá ( tạo file PDF theo trường  -> gửi cho khách link file qua zalo hoặc SMS
        //             // Gửi số khối lượng báo giá để tạo bảng ; nội dung, đơn vị tính, khối lượng, giá thành, thành tiền, bảo hành

        //         }
        //         elseif($ac ==3)
        //         {}
        //         else
        //         {

        //         }
    }
// Lấy thông tin lịch sử xử lý lịch
    public function sectionWorkAss(Request $request)
    {
        $id_work_has = $request->id_work_has;
        // dd($id_work_has);
        $his_work = WorksAssignment::where('id', '=', $id_work_has)->value('his_work');

        return response()->json($his_work);
    }
    // thêm lịch sử xử lý lịch web

    public static function insertHisWork($id_work_has, $his_work)
    {
        //     $id_work_has = $request->id_work_has;
        // $his_work=json_encode($his_work);
        $his_on_table = WorksAssignment::where('id', '=', $id_work_has)->value('his_work');
        // dd($his_on_table);

        if ($his_on_table && $his_on_table == '') {

            $up_his = WorksAssignment::where('id', '=', $id_work_has)->update(['his_work' => $his_work]);

        } elseif ($his_on_table && $his_on_table != '') {
            $his_on_table = json_decode($his_on_table, true); // Decode the existing JSON array into a PHP array

            if (is_array($his_on_table)) {
                $new_entry = json_decode($his_work, true); // Decode the new JSON object into a PHP array
                // dd($new_entry);
                $his_on_table = array_merge($his_on_table, $new_entry); // Append the new object to the existing array
                $updated_json = json_encode($his_on_table); // Encode the updated array back into a JSON array
                $up_his = WorksAssignment::where('id', '=', $id_work_has)->update(['his_work' => $updated_json]);
            }
        } else {
            // Handle the case where his_on_table is null or not valid JSON
            $up_his = WorksAssignment::where('id', '=', $id_work_has)->update(['his_work' => $his_work]);

        }
        if ($up_his) {
            return 1;
        } else {
            return 0;
        }
    }
    // thêm lịch sử xử lý lịch Moblie
    public function insertHisWorkMobile(Request $request)
    {
        $id_work_has = $request->id_work_has;
        $his_work = $request->his_work;
        $his_on_table = WorksAssignment::where('id', '=', $id_work_has)->value('his_work');
        // dd(json_decode($his_work, true));

        if ($his_on_table === null || $his_on_table == '') {
            // Nếu không có dữ liệu hiện có hoặc dữ liệu là một chuỗi rỗng, cập nhật với mục nhập mới
            $up_his = WorksAssignment::where('id', '=', $id_work_has)->update(['his_work' => $his_work]);

        } elseif ($his_on_table && $his_on_table != '') {
            $his_on_table = json_decode($his_on_table, true); // Decode the existing JSON array into a PHP array

            if (is_array($his_on_table)) {
                $new_entry = json_decode($his_work, true); // Decode the new JSON object into a PHP array
                $his_on_table = array_merge($his_on_table, $new_entry); // Append the new object to the existing array

                $updated_json = json_encode($his_on_table); // Encode the updated array back into a JSON array
                $up_his = WorksAssignment::where('id', '=', $id_work_has)->update(['his_work' => $updated_json]);
            }
        } else {
            // Handle the case where his_on_table is null or not valid JSON
            $up_his = WorksAssignment::where('id', '=', $id_work_has)->update(['his_work' => $his_work]);

        }
        if ($up_his) {
            return 1;
        } else {
            return 0;
        }
    }
    //Lấy dữ liệu tổng từ bảng lịch đã phân gửi Ktra bởi ADMIN getCancleBook
    public function getCancleBook()
    {

        return 'Tất cả thông tin';
    }
    public function checkInOut(Request $request)
    {
        if ($request->id_work_has && $request->check_in_out) {
            WorksAssignment::where('id', '=', $request->id_work_has)->update(['check_in' => $request->check_in_out]);

            return 1;
        } else {
            return -1;
        }
    }

}
