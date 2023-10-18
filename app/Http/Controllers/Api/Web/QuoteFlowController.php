<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuoteFlow;

class QuoteFlowController extends Controller
{
    //
    public function index() {
        $q = QuoteFlow::limit(100)->get();

        return response()->json($q);
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
