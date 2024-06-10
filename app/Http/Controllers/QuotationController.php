<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\WorksAssignmentController;
use App\Models\Quotation;
use App\Models\User;
use App\Models\Work;
use App\Models\WorksAssignment;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\Request;
use Intervention\Image\Colors\Rgb\Channels\Red;

class QuotationController extends Controller
{
    //
    public function create(Request $re)
    {
        $seri_imag = '';
        if ($re->hasFile('image_work_path')) {
            $images = $re->file('image_work_path');
            // dd($images);
            foreach ($images as $image) {
                $name = $re->id . '-' . time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
                $image->move('assets/images/work_assignment/' . $re->id . '/quote', $name);
                $seri_imag .= 'assets/images/work_assignment/' . $re->id . '/quote/' . $name . ',';
            }
        }
        $new  = new Quotation([
            'id_work_has' => $re->id_work_has,
            'id_auth' => $re->id_auth,
            'quote_date' => $re->quote_date,
            'quote_info' => $re->quote_info,
            'quote_image'=>$seri_imag,
            'quote_total_price' => $re->quote_total_price,
            'vat'=>$re->vat
        ]);
        $new->save();
        $his_work = '"id_auth": null,"id_worker":"'.$re->worker.'","action":"bg","time":"'.date('Y-m-d H:m:s').'"';
        WorksAssignmentController::insertHisWork($re->id_work_has,$his_work);
        if($re->quote_total_price >0)
        {
            
        }
        if ($new) {
            return 1;
        } else return 0;
    }
    public function generatePDF()
    {
        $quote = Quotation::where('id', '=', 1)->get();
        // $data = [

        // ];
        foreach ($quote as $item) {
            $info_khach = WorksAssignment::where('id', '=', $item->id_work_has)->value('id_cus');
            $info_khach_tbCus = Work::where('id', '=', $info_khach)->get([
                'work_content',
                'name_cus',
                'phone_number',
                'street',
                'district',
            ]);
            $user = User::where('id','=',$item->id_auth)->get(['name','phone','email','position']);
            $data = [
                'info_cus' =>   json_decode($info_khach_tbCus),
                'date' => date('m/d/Y'),
                'user' => json_decode($user),
                'quote_info' => json_decode($item->quote_info)
            ];
        }
        // dd($data);
        if($data == null)
        {
            $data = ['data'=>'Null'];
        }

        // $users = User::all();
        $pdf = FacadePdf::loadView('pdf.pdftemplate',array('data' =>  $data))
            ->setOption(['dpi' => 150, 'defaultFont' => ' Times New Roman, Times, serif',])
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
