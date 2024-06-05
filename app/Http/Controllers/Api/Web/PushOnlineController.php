<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use stdClass;

class PushOnlineController extends Controller
{
    public function __invoke()
    {

    }
    public function updateOnline(Request $re)
    {
        // dd($re->all());
        if($re->ac == 1)
        {
            DB::table('users')->where('id','=',$re->id)->update(['is_online'=> 1]);
        }
        else{
            DB::table('users')->where('id','=',$re->id)->update(['is_online'=> 0]);
        }
        return 'OK';
    }
    public function listOnline()  {
        $list  = User::where('is_online','=',1)->get(['id','name','avatar']);
        $num = count($list);
        // $is_online = new stdClass();
        $is_online['list_user'] = $list; 
        $is_online['num'] =$num;
        return response()->json($is_online);
        // return response()->json($is_online);
    }
}
