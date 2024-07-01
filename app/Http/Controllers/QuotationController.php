<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\WorksAssignmentController;
use App\Models\Quotation;
use App\Models\Work;
use App\Models\Worker;
use App\Models\WorksAssignment;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\Request;

class QuotationController extends Controller
{
    //
    public function getByWorkHas(Request $request)
    {
        $id = $request->id_work_has;

        $quote = Quotation::where('id_work_has', '=', $id)->value(['id_work_has', 'id_auth', 'quote_date', 'quote_info','quote_total_price','quote_status','quote_image','quote_note','quote_cus_info','quote_user_info']);
        //TH1 : Không có báo giá trường trong bảng báo giá
        if (count($quote) == 0) {
            // Thợ khảo sát báo giá báo cáo bằng hình chụp, tổng giá tiền
            $quote_work_has = WorksAssignment::where('id', '=', $id)->get(['id_cus',
                'id_worker',
                'id_phu',
                'real_note',
                'income_total',
                'bill_imag']
            );
            return response()->json(['data' => $quote_work_has, 'ac' => 2]);
        } else {
            return response()->json(['data' => $quote, 'ac' => 1]);
        }

    }

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
                $name = $re->id_work_has . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/work_assignment/' . $re->id_work_has . '/quote', $name);
                $seri_imag .= 'assets/images/work_assignment/' . $re->id_work_has . '/quote/' . $name . ',';
            }
        }
        if(isset($re->quote_date))
        {
            $quote_date = $re->quote_date;
        }
        else
        {
            $quote_date = date('Y-m-d');
        }
        // dd($ac);
        // tạo thông tin báo giá khảo sát
        //  ac 1 tạo thông tin trực tiếp trên bảng work_assignments, ac 2 tạo thông tin trên bảng quotations, ac 3 trả thông tin cho bảng work
        // dd($seri_imag);
        if ($ac == 1) {
            //Báo giá nhanh ( có giá ít gửi luôn cho khách - Chụp hình hoặc k chụp hình)
            // Cần hình ảnh chứng minh bg  hoặc nhập số tiền + phương thức bg
            // Điền thông tin lịch sử
            $his_work = '[{"id_auth": null,"id_worker":"' . $re->id_worker . '","action":"BaoGia","time":"' . $time . '"}]';
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
                $his_work = '[{"id_auth": ' . $re->auth_id . ',"id_worker":"null","action":"BaoGia","time":"' . $time . '"}]';
            } else {
                $his_work = '[{"id_auth": null,"id_worker":"' . $re->id_worker . '","action":"BaoGia","time":"' . $time . '"}]';
            }
            WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
            // Thêm dữ liệu vào bảng Báo giá
            // $quote_info = '[{"content":"Sửa ML","unit":"cái","quality":"2","price":"1000000","total":"2000000","vat":"10","note":"Không sửa lỗi khác",}]';
            $new = new Quotation([
                'id_work_has' => $re->id_work_has,
                'id_auth' => $re->auth_id,
                'quote_info' => $re->quote_info, // Trường này dạng JSON
                'quote_image' => $seri_imag,
                'quote_date'=>$quote_date,
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
            // Yêu cầu có id_cus, id_work_has, work_note, image_work,id_worker
            $his_work = '[{"id_auth": null,"id_worker":"' . $re->id_worker . '","action":"baogia","time":"' . $time . '"}]';
            WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
            // dd($his_work);
            // Lấy thông tin note
            $note = Worker::where('id', '=', $re->id_worker)->value('worker_full_name');
            // $note = Work::where('id', '=', $re->id_cus)->update(['status_cus'=>0]);
            $note .= ' - Đã KS' .$re->work_note;
            // cập nhật thông tin bảng
            WorksAssignment::where('id', '=', $re->id_work_has)->update(['status_work' => 4]);
            $new = Work::where('id', '=', $re->id_cus)->update(['image_work_path' => $seri_imag, 'work_note' => $note, 'status_cus' => 0]);
        }

        //trả dữ liệu báo giá khảo sát
        if ($new) {
            return 1;
        } else {
            return -1;
        }}

    // VP trực tiếp làm báo giá mà k cần thợ ks
    public function adminQuote(Request $re)
    {
        // $quote_info = '[{"content":"Sửa ML","unit":"cái","quality":"2","price":"1000000","total":"2000000","vat":"10","note":"Không sửa lỗi khác",}]';
        // $user_info = '[{"name":"Trần Mạnh","email":"lienhe@thoviet.com.vn","potision":"NV Kinh Doanh","phone":"0912847218"}]';
        // $cus_info = '[{"name":"Trần Mạnh","email":"lienhe@thoviet.com.vn","address":"NV Kinh Doanh","phone":"0912847218"}]';
        // $quote_note=[{"id":"1","note_content":"Khong bao hanh","id":"2","note_content":"Tinh theo thucte thi cong"}];
        // dd($re->all());
        $quote_total_price = $re->quote_total_price;
        // lấy hình ảnh khảo sát thực tế nếu có
        $seri_imag = '';
        if ($re->hasFile('image_work')) {
            $images = $re->file('image_work');
            // dd($images);
            foreach ($images as $image) {
                $name = $re->id_work_has . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/' . $re->id_work_has . '/quote', $name);
                $seri_imag .= 'assets/images/' . $re->id_work_has . '/quote/' . $name . ',';
            }
        }
        $new = new Quotation([
            'id_work_has' => $re->id_work_has,
            'id_auth' => $re->auth_id,
            'quote_date' => date('d-m-Y'),
            'quote_info' => $re->quote_info, // Trường này dạng JSON
            'quote_image' => $seri_imag,
            'quote_cus_info' => $re->quote_cus_info,
            'quote_user_info' => $re->quote_user_info,
            'quote_total_price' => $quote_total_price,
            'quote_note' => $re->quote_note,
            'quote_image' => $seri_imag,
            'vat' => $re->vat,
        ]);
        $new->save();

        WorksAssignment::where('id', '=', $re->id_work_has)->update(['status_work' => 3]);

        $his_work = '[{"id_worker": null,"auth_id":"' . $re->auth_id . '","action":"baogiaad","time":"' . date('Y-m-d H:m:s') . '"}]';
        WorksAssignmentController::insertHisWork($re->id_work_has, $his_work);
        if ($new) {
            return 1;
        } else {
            return 0;
        }

    }
    public function update(Request $request)
    {
        // dd($request);
        $quote_id = $request->quote_id;
        // dd($quote_id);
        $quote = Quotation::find($quote_id);

        if (!$quote) {
            return response()->json(['error' => 'Quotation not found'], 404);
        }

        $id_work_has = $request->id_work_has;
        $id_auth = $request->auth_id;
        $quote_date = date('d-m-Y');
        $quote_info = $request->quote_info; // Dữ liệu này dạng JSON
        $quote_cus_info = $request->quote_cus_info;
        $quote_user_info = $request->quote_user_info;
        $quote_total_price = $request->quote_total_price;
        $quote_note = $request->quote_note;
        $vat = $request->vat;
        $quote_work_content = $request->quote_work_content;

        // Xóa hình ảnh cũ nếu có yêu cầu cập nhật hình ảnh mới
        if ($request->hasFile('image_work')) {
            // Bạn cần đảm bảo rằng bạn có cơ chế xóa hình ảnh cũ phù hợp (không được cung cấp trong mã của bạn)
            $seri_imag = '';
            $images = $request->file('image_work');
            foreach ($images as $image) {
                $name = $id_work_has . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/' . $id_work_has . '/quote', $name);
                $seri_imag .= 'assets/images/' . $id_work_has . '/quote/' . $name . ',';
            }
            $quote_image = $seri_imag;
        }

        Quotation::where('id','=',$quote_id)->update([
            'id_auth'=>$id_auth,
            'quote_date'=>$quote_date,
            'quote_info'=>$quote_info,
            'quote_total_price'=>$quote_total_price,
            // 'quote_image'=>$quote_image,
            'quote_note'=>$quote_note,
            'quote_cus_info'=>$quote_cus_info,
            'quote_user_info'=>$quote_user_info,
            'vat'=>$vat,
            'quote_work_content'=>$quote_work_content
        ]);


        WorksAssignment::where('id', '=', $id_work_has)->update(['status_work' => 3]);

        $his_work = '[{"id_worker": null,"auth_id":"' . $id_auth . '","action":"capnhatbaogia","time":"' . date('Y-m-d H:m:s') . '"}]';
        WorksAssignmentController::insertHisWork($id_work_has, $his_work);

        if ($quote) {
            return response()->json(['success' => true, 'message' => 'Quotation updated successfully'], 200);
        } else {
            return response()->json(['success' => false, 'message' => 'Failed to update quotation'], 500);
        }
    }
    public function generatePDF(Request $re)
    {
        $quote = Quotation::where('id', '=', $re->id_quote)->get();
        $data = [
                'date' => date('m/d/Y'),
                'quote_info' => json_decode($quote)
            ];

        if ($data == null) {
            $data = ['data' => 'Null'];
        }
        // dd($data);
        $pdf = FacadePdf::loadView('pdf.pdftemplate', array('data' => $data))
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
