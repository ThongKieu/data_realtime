<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class PushOnlineController extends Controller
{
    public function __invoke()
    {

    }
    public function updateOnline(Request $re)
    {
        DB::table('users')->where('id','=',$re->id)->update(['is_online'=> 1]);
        return 1;
    }
    public function listOnline()  {
        $is_online = User::where('is_online','=',1)->get();
        return response()->json($is_online);
    }
}
