<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\NoticationAll;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NoticationAllController extends Controller
{
    //
    public function index(Request $request)
    {
      
        $new_work_from_app = NoticationAll:: where('from_table', '=',1)->get();
        $new_work_from_worker = NoticationAll:: where('from_table', '=',2)->get();
        $new_return_work_from_worker = NoticationAll:: where('from_table', '=',3)->get();
        $new_feeback = NoticationAll:: where('from_table', '=',4)->get();
        $data_return = [
            'new_work_from_app'=> $new_work_from_app,
            'new_work_from_worker'=> $new_work_from_worker,
            'new_feeback'=> $new_feeback,
            'new_return_work_from_worker'=> $new_return_work_from_worker,
        ];

        return $data_return;
    }
    public function soketNoti (Request $request)
    {
        $admin_name = '%'.$request->code.'%';
        $get_noti = NoticationAll::where('user_read','not like',$admin_name)->get();

        $c_all_noti = count($get_noti);
        return $c_all_noti;
    }
    
    public static function create($from_table,$info_notication,$flag_noti)
    {
        // $new_noti = 
    }
    public function newWorkFromApp(){}
    public function newWorkFromWorker(){}
    public function newFeeback(){}
    public function returnWorkFromWorker(){}
}
