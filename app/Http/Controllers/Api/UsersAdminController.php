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
        
        return response()->json('Ngon');
    }
}
