<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\CheckWorkByAdmin;
use Illuminate\Http\Request;

class CheckWorkByAdminController extends Controller
{
    public static function create($id_work_ass, $id_auth) {
        $ne = new CheckWorkByAdmin([
            'id_work_ass'=>$id_work_ass,
            'id_auth'=>$id_auth,
        ]);
        $ne->save();
        if($ne)
        {
            return true;
        }
        else
        { return false;}
    }
    public static function makeCheck($id_work_ass , $id_auth,$info_check)
    {

    }
}
