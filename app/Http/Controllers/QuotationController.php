<?php

namespace App\Http\Controllers;
use App\Models\Quotation;
use App\Models\User;
use Barryvdh\DomPDF\Facade\Pdf as FacadePdf;
use Illuminate\Http\Request;
use Spatie\LaravelPdf\Facades\Pdf;

class QuotationController extends Controller
{
    //
    public function create(Request $re)
    {
        $new  = new Quotation([
            'id_work_has'=> $re->id_work_has,
            'id_auth'=> $re->id_auth,
            'quote_date'=> $re->quote_date,
            'quote_info'=> $re->quote_info,
            'quote_total_price'=> $re->quote_total_price,
        ]);
        $new->save();
        if($new)
        {
            return 1;
        }
        else return 0;
    }
    public function generatePDF()
    {
        $users = User::all();

        $data = [
            'title' => 'Welcome to Funda of Web IT - fundaofwebit.com',
            'date' => date('m/d/Y'),
            'users' => $users
        ];
        $pdf = FacadePdf::loadView('pdf.pdftemplate', $data);
        // $pdf->setOptions(['dpi' => 150]);
        $pdf->setBasePath(public_path());
        return $pdf->stream('users-lists.pdf');
    }
    // public function generatePDF()
    // {
    //     // $users = User::all();
    //     $users = User::all();

    //     $pdf = FacadePdf::loadView('pdf.pdftemplate', array('users' =>  $users))
    //     ->setPaper('a4', 'portrait');

    //     return $pdf->download('pdftemplate.pdf');
    // // return $pdf = ::loadView('pdf.pdftemplate', array('users' =>  $users));

    // //  $pdf->stream();
    //     //  $pdf->save('itsolutionstuff.pdf');
    // }
}
