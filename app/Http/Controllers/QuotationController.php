<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\WorksAssignmentController;
use App\Models\Quotation;
use App\Models\User;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    //
    public function create(Request $re)
    {$new = '';
        $ac = $re->ac;
        $new = '';
        $quote_total_price = $re->quote_total_price;
        $time = date('Y-m-d H:m:s');
        // lấy hình ảnh khảo sát thực tế nếu có
        $seri_imag = '';
        if ($re->hasFile('image_work')) {
            $images = $re->file('image_work');

            foreach ($images as $image) {
                $name = $re->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/work_assignment/' . $re->id_work_has . '/quote', $name);
                $seri_imag .= 'assets/images/work_assignment/' . $re->id_work_has . '/quote/' . $name . ',';
            }
        }
        // tạo thông tin báo giá khảo sát
        // dd($seri_imag);
        if ($ac == 1) {
            //Báo giá nhanh ( có giá ít gửi luôn cho khách - Chụp hình hoặc k chụp hình)
            // Cần hình ảnh chứng minh bg  hoặc nhập số tiền + phương thức bg
            // Điền thông tin lịch sử
            $his_work = '[{"id_auth": null,"id_worker":"' . $re->id_worker . '","action":"baogia","time":"' . $time . '"}]';

            WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
            // cập nhật dữ liệu cho bảng thợ đã làm
            if ($quote_total_price > 0) {
                // dd($re->seri_imag);
                $new = WorksAssignment::where('id', '=', $re->id_work_has)->update([
                    'status_work' => 3,
                    'income_total' => $quote_total_price,
                    'real_note' => $re->quote_by, //điền thông tin bg qua zalo, bg qua đt, tn nhắn, hoặc phiếu bg
                    'bill_imag' => $seri_imag,
                ]);
            }
        } elseif ($ac == 2) {
            // Khảo sát chờ báo giá ( tạo file PDF theo trường  -> gửi cho khách link file qua zalo hoặc SMS
            // Yêu cầu có id_work_has, auth_id (mobile = 0), quote_date, quote_info,seri_imag, quote_total_price, vat(mobile = 0), id_worker
            // Gửi số khối lượng báo giá để tạo bảng ; nội dung, đơn vị tính, khối lượng, giá thành, thành tiền, bảo hành, hình ảnh báo giá
            // cập nhật lịch sử
            if (isset($re->auth_id)) {
                $his_work = '[{"id_auth": ' . $re->auth_id . ',"id_worker":"null","action":"baogiaad","time":"' . $time . '"}]';
            } else {
                $his_work = '[{"id_auth": null,"id_worker":"' . $re->id_worker . '","action":"baogia","time":"' . $time . '"}]';
            }
            WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
            // Thêm dữ liệu vào bảng Báo giá
            // $quote_info = '[{"content":"Sửa ML","unit":"cái","quality":"2","price":"1000000","total":"2000000","vat":"10","note":"Không sửa lỗi khác",}]';
            $new = new Quotation([
                'id_work_has' => $re->id_work_has,
                'id_auth' => $re->auth_id,
                'quote_date' => $re->quote_date,
                'quote_info' => $re->quote_info, // Trường này dạng JSON
                'quote_image' => $seri_imag,
                'quote_total_price' => $quote_total_price,
                'vat' => $re->vat,
            ]);
            $new->save();
            WorksAssignment::where('id', '=', $re->id_work_has)->update([
                'status_work' => 3,
                'income_total' => $re->quote_total_price,
            ]);
        } elseif ($ac == 3) {
            // Thợ ks mà không làm được cty gửi cho thợ khác báo
            // Yêu cầu có id_cus, id_work_has, work_note, imag_path,id_worker
            $his_work = '"id_auth": null,"id_worker":"' . $re->id_worker . '","action":"tra","time":"' . $time . '"';
            WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
            // Lấy thông tin note
            $note = Worker::where('id', '=', $re->id_worker)->value('worker_full_name');
            $note .= 'Đã KS';
            // cập nhật thông tin bảng
            WorksAssignment::where('id', '=', $re->id_work_has)->update(['status_work' => 4]);
            Work::where('id', '=', $re->id_cus)->update(['image_work_path' => $seri_imag, 'work_note' => $note]);
        }

        //trả dữ liệu báo giá khảo sát
        if ($new) {
            return 1;
        } else {
            return 0;
        }}

    // VP trực tiếp làm báo giá mà k cần thợ ks
    public function adminQuote(Request $re)
    {
        $quote_total_price = $re->quote_total_price;
        // lấy hình ảnh khảo sát thực tế nếu có
        $seri_imag = '';
        if ($re->hasFile('image_work')) {
            $images = $re->file('image_work');
            // dd($images);
            foreach ($images as $image) {
                $name = $re->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/' . $re->id . '/quote', $name);
                $seri_imag .= 'assets/images/' . $re->id . '/quote/' . $name . ',';
            }
        }
        $new = new Quotation([
            'id_work_has' => $re->id_work_has,
            'id_auth' => $re->auth_id,
            'quote_date' => $re->quote_date,
            'quote_info' => $re->quote_info, // Trường này dạng JSON
            'quote_image' => $seri_imag,
            'quote_total_price' => $quote_total_price,
            'vat' => $re->vat,
        ]);
        $new->save();

        WorksAssignment::where('id', '=', $re->id_work_has)->update(['status_work' => 3]);
        $his_work = '"id_worker": null,"auth_id":"' . $re->auth_id . '","action":"tra","time":"' . date('Y-m-d H:m:s') . '"';
        WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
        if ($new) {
            return 1;
        } else {
            return 0;
        }

    }
    public function generatePDF(Request $re)
    {
        // $quote = Quotation::where('id', '=', 1)->get();

        // foreach ($quote as $item) {
        //     $info_khach = WorksAssignment::where('id', '=', $item->id_work_has)->value('id_cus');
        //     $info_khach_tbCus = Work::where('id', '=', $info_khach)->get([
        //         'work_content',
        //         'name_cus',
        //         'phone_number',
        //         'street',
        //         'district',
        //     ]);
        $user = User::where('id', '>', 1)->get(['name', 'phone', 'email', 'position']);
        //     $data = [
        //         'info_cus' =>   json_decode($info_khach_tbCus),
        //         'date' => date('m/d/Y'),
        //         'user' => json_decode($user),
        //         'quote_info' => json_decode($item->quote_info)
        //     ];
        // }
        // // dd($data);
        // if ($data == null) {
        //     $data = ['data' => 'Null'];
        // }

        // $users = User::all();
        $pdf = FacadePdf::loadView('pdf.pdftemplate', array('data' => $user))
            ->setOption(['dpi' => 150, 'defaultFont' => ' Times New Roman, Times, serif'])
            ->setPaper('a4', 'vertical');
        return $pdf->stream('users-lists.pdf');
    }
    // public function generatePDF()
    // {
    //     // $users = User::all();

    //     $pdf = FacadePdf::loadView('pdf.pdftemplate', array('users' =>  $users))
    //     ->setPaper('a4', 'portrait');

    //     return $pdf->download('pdftemplate.pdf');
    // // return $pdf = ::loadView('pdf.pdftemplate', array('users' =>  $users));

    // //  $pdf->stream();
    //     //  $pdf->save('itsolutionstuff.pdf');
    // }
}
