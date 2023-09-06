<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\Worker;
use Illuminate\Http\Request;

class WorkersController extends Controller
{
    //
    public function index()
    {
        return response()->json(Worker::all());
    }
    public function store(Request $request) {

        $validated = $request->validate([
            'worker_firstname'=>'required|max:255',
            'worker_name'=>'max:255',
            'sort_name'=>'required|max:20',
            'add_woker'=>'required|max:500',
            'phone_ct'=>'required|numeric',
            'phone_cn'=>'numeric',
            'folder_path'=>'max:500',
            'kind_worker'=>'numeric',
            'has_work'=>'numeric',
            'status_worker'=>'numeric',
            'check_acc'=>'numeric',
            'avata'=>'max: 1000'
        ]);
       $new = new Worker([
        'worker_firstname'=>$request->worker_firstname,
        'worker_name'=>$request->worker_name,
        'sort_name'=>$request->sort_name,
        'add_woker'=>$request->add_woker,
        'phone_ct'=>$request->phone_ct,
        'phone_cn'=>$request->phone_cn,
        'folder_path'=>'assets/'.$request->sort_name,
        'kind_worker'=>$request->kind_worker,

        'avata'=>'assets/avata/'.$request->folder_path.'.png',
       ]);
        $new->save();
        return response()->json('Worker create');
    }
}
