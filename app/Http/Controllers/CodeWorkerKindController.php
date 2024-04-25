<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Api\UsersAdminController;
use App\Models\CodeWorkerKind;
use Illuminate\Http\Request;

class CodeWorkerKindController extends Controller
{
    //
    public function index() {
        return response()->json(CodeWorkerKind::all());
    }
    public function store(Request $re) {
        // dd($re->all());
        $data= CodeWorkerKind::where('code_worker','=',$re->code_worker)->get('id');
        // dd(count($data));
        if(count($data) == 0)
        {
            $new = new CodeWorkerKind([
                'code_worker'=>$re->code_worker,'kind_worker'=>$re->kind_worker, 'descript_code_worker'=>$re->descript_code_worker,'status_code_worker'=>0
            ]);
            $new -> save();
            return response()->json(['data'=> 0]);

        }

        return response()->json(['data'=>1]);
    }

    public function checkCode(Request $re) {

        return $re->all();
    }
    public function changeCodeStatus(Request $re) {
        $check = UsersAdminController::checkPerAd($re->auth_id);
        if($check == 2 )
        {
            if( $re->id)
            {
               $up = CodeWorkerKind::where('id','=',$re->id)->update(['status_code_worker'=>$re->status_code_worker]);
               if($up)
               {
                return response()->json('Up done');
               }
               else
               {
                return response()->json('Up false');
               }
            }
        }
        return 'Permission Dinied!!!!!!!';
    }


}
