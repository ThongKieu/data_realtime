<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

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
            'password' => ['required', Rules\Password::defaults()],
            'permission' => 'required',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'permission' =>$request->permission,
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
}
