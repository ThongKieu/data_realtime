<?php

namespace App\Http\Controllers;

use App\Models\ZaloZns;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ZaloZnsController extends Controller
{
    public function index()
    {
        $code_all = ZaloZns::all();
        
        $time = strtotime(Carbon::now());
        // return view('admin.zalozns',compact('code_all','time'));
    }
    public function index_bg()
    {
        $code_all = ZaloZns::all();
        
        $time = strtotime(Carbon::now());
        // return view('admin.zalozns_bg',compact('code_all','time'));
    }
    public function index_bg_15()
    {
        $code_all = ZaloZns::all();
        // dd($code_all);
        $time = strtotime(Carbon::now());
        // return view('admin.zalozns_bg_15d',compact('code_all','time'));
    }
    public function zns_dkbh()
    {
        $code_all = ZaloZns::all();
        // dd($code_all);
        $time = strtotime(Carbon::now());
        // return view('admin.zalozns_dkbh',compact('code_all','time'));
    }
    public function getCode(Request $req)
    {   $code_all = ZaloZns::all();
        $code_token = $req->code;
        if($code_all->count()==0){
            if($req->code)
            {
                $newzns_code = new ZaloZns();
                $newzns_code ->code = $req->code;
                $newzns_code->save();
                $code_token = $req->code;
                // return view('admin.token_zns',compact('code_token'));
            }
            else
                dd('Không lấy được code');
        }
        else
        {   
            $update_code = ZaloZns::where('id','=',1)->update(['code'=>$req->code]);
            // $update_code->code = $req->code;
            // return view('admin.token_zns',compact('code_token'));

        }
           
       
    }
    public function addAccess(Request $req)
    {
       dd($req);
        
    }
    public function save_token(Request $req)
    {
        $time = strtotime(Carbon::now());
        $update_code = ZaloZns::where('id','=',1)->update(['access_token_zns'=>$req->access_token,'time_access_token'=>$time,'refresh_token_zns'=>$req->refresh_token,'time_refresh_token'=>$time]);
       
        return redirect()->action('ZaloZnsController@index_bg');
    }
    public function updateAccessToken()
    {
        
    }
    public function cskhAll()
    {
        $fr = date('Y-m-d');
        // return $fr;
        $to = Carbon::createFromFormat('Y-m-d', $fr) ->subDay(10)->format('Y-m-d');
        // $ne =[];
        $old_cus = DB::table('old_custus')->where('date_book','=',$to)->where('income_total','like', 'cskh') -> get(['id','work_content','date_book','add_cus','des_cus','phone_cus','worker_name']);
        // foreach($old_cus as $item)
        // {
        //     $ne_add = str_replace('','-',$item->add_cus);
        //     $ne['id'] = $item->id;
        //     $ne['work_content'] = $item->work_content;
        //     $ne['date_book'] = $item->date_book;
        //     $ne['add_cus'] = $ne_add; 
        //     $ne['phone_cus'] = $item->phone_cus;
        //     $ne['worker_name'] = $item->worker_name;
        // }
        
        return response()->json(['data'=>$old_cus]);
    }
    public function cskh2All()
    {
        $fr = date('Y-m-d');
        // return $fr;
        $to = Carbon::createFromFormat('Y-m-d', $fr) ->subDay(7)->format('Y-m-d');
        // $ne =[];
        $old_cus = DB::table('old_custus')->where('date_book','=',$to)->where('income_total','like', 'cskh') -> get(['id','work_content','date_book','add_cus','des_cus','phone_cus','worker_name']);
        // foreach($old_cus as $item)
        // {
        //     $ne_add = str_replace('','-',$item->add_cus);
        //     $ne['id'] = $item->id;
        //     $ne['work_content'] = $item->work_content;
        //     $ne['date_book'] = $item->date_book;
        //     $ne['add_cus'] = $ne_add; 
        //     $ne['phone_cus'] = $item->phone_cus;
        //     $ne['worker_name'] = $item->worker_name;
        // }zns_dkbh
        
        return response()->json($old_cus);
    }
}
