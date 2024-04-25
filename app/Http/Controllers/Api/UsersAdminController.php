<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use Illuminate\Validation\Rules;

// use Ru`

class UsersAdminController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['users'=>$users]);
    }

    public  function create(Request $request) {
        // dd($request);
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required',Rules\Password::defaults()],
            'permission' => 'required',
        ]);
        $code = User::where('id','>',0)->orderBy('id','desc')->limit(1)->value('id');
        $code +=1;
        $n_code = 'VP'.$code;
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'permission' =>$request->permission,
            'code' => $n_code,
        ]);
        // dd($user);
        return response()->json('Ngon');
    }
    public function resetPassAdmin(Request $request)
    {
       $id = $request-> id;
    //    dd($id);
        User::where('id','=',$id)->update(['password'=>Hash::make('Thoviet58568')]);

        return response()->json('Done');
    }
    public function resetPerAdmin(Request $request)
    {
       $id = $request-> id;
    //    dd($request);
        User::where('id','=',$id)->update(['permission'=>$request->permission]);
        return response()->json('Done');
    }
    public static function checkPerAd ($auth_id)
    {
        $check = User::where('id','=',$auth_id)->value('permission');
        if($check == 0)
        {
            return 2;
        }
        elseif($check == 1)
        {
            return 1;
        }
        else
         return 0;
    }
}
