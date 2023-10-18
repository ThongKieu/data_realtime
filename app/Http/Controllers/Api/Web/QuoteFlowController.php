<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuoteFlow;
use App\Models\User;
use Illuminate\Support\Facades\DB;

class QuoteFlowController extends Controller
{
    //
    public function index() {
        $q = DB::table('quote_flows')
        ->join('works', 'quote_flows.id_work','=','works.id')
        ->join('users', 'quote_flows.staff_in_create_id','=','users.id')
        ->get([
            'quote_flows.id','id_work', 'staff_in_change_id', 'staff_in_create_id', 'total', 'expense', 'pripot_percent', 'status', 'date_do','name',
             'work_content', 'name_cus', 'date_book', 'work_note', 'street', 'district', 'phone_number', 'image_work_path',
        ]);
        return response()->json($q);
    }
    public function getAdminName(Request $re)
    {
        $name = User::where('id','=',$re -> id)->value('name');

        return response()->json($name);
    }
    public  function store(Request $request)
    {

    }
    public function update(Request $request)
    {

    }
    public static function addAuto($id, $auth_id) {
        // dd($id);

        $new = new QuoteFlow([
            'id_work'=> $id,
            'staff_in_create_id'=>$auth_id,
            'to_table'=>0
        ]);
        $new -> save();
       if($new)
       {
         return 200;
       }
       else 
            return 'Error!!!';

    }

}
