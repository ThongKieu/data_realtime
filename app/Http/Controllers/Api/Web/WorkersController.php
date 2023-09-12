<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Models\Worker;
use Illuminate\Http\Request;

class WorkersController extends Controller
{
    //
    public function __invoke(){}
    public function index()
    {
        return response()->json(Worker::all());
    }
    public function store(Request $request)
    {

        $sort = WorkersController::getSortName($request->kind_worker);

        if ($request->hasFile('avata_new')) {
            $file = $request->file('avata_new');
            $name = $sort . '.' . $file->extension();
            $file->move('assets/avata/', $name);
            // $files = $files.'assets/avata/'.$name.',';
            $path = 'assets/avata/'.$name;
        }
        else
        {
            $path = 'assets/avata/avata1.png';
        }
        // dd($request->all());
        $new = new Worker([
            'worker_firstname' => $request->worker_firstname,
            'worker_name' => $request->worker_name,
            'sort_name' => $sort,
            'add_woker' => $request->add_woker,
            'phone_ct' => $request->phone_cty,
            'phone_cn' => $request->phone_cn,
            'folder_path' => 'assets/images/work/' . $sort,
            'kind_worker' => $request->kind_worker,
            'avata' => $path,
        ]);
        $new->save();
        return response()->json('Worker create');
    }
    public static function getSortName($kind_worker)
    {
        $num = Worker::where('kind_worker', '=', $kind_worker)->get('id');
        $num_of_kind = count($num);
        $num_of_kind += 1;
        $p = substr(sprintf('%02d',  $num_of_kind), 0, 8);
        switch ($kind_worker) {
            case 0:
                $sort = 'A' . $p;
                return  $sort;
            case 1:
                $sort = 'B' . $p;
                return  $sort;
            case 2:

                $sort = 'C' . $p;
                return  $sort;
            case 3:
                $sort = 'D' . $p;
                return  $sort;
            case 4:
                $sort = 'F' . $p;
                return  $sort;
            case 5:
                $sort = 'G' . $p;
                return  $sort;
            case 6:
                $sort = 'H' . $p;
                return  $sort;
            default:
                $sort = 0;
                return $sort;
        }
        // return $p = substr(sprintf('%02d', '9'),0,8);
    }
    public function addAvata(Request $req)
    {
        if($req->hasFile('avata_new'))
        {
            $file = $req->file('avata_new');
            $name = $req->sort_name.$file->extension();
            $file->move('assets/avata/', $name);
            // $files = $files.'assets/avata/'.$name.',';
            $up = Worker::where('sort_name','=',$req->sort_name)-> update(['avata'=>$file]);

            if($up)
            {
                return 'Update Done!';
            }
            else
            {
                return 'Failse Update';
            }
        }
    }
    public function updateWorker(Request $re)
    {
        $action = $re->action;
        //    dd($re->all());
        switch ($action) {
            case 'status_change_worker':
                // dd($re->id);
                Worker::where('id', '=', $re->id)->update(['status_worker' => $re->status]);
                return response()->json(['data' => 'Change Status']);
            case 'avata_change_worker':
                if ($re->hasFile('avata_new')) {
                    $file = $re->file('avata_new');
                    $name = $re->sort_name . '-' . time() . '.' . $file->extension();
                    $file->move('assets/avata/', $name);
                    $path = 'assets/avata/'.$name;
                    $up = Worker::where('sort_name', '=', $re->sort_name)->update(['avata' => $path]);
                }
                return response()->json(['data' => 'Change Avata']);
            case 'phone_change_worker':
                Worker::where('id', '=', $re->id)->update(['phone_ct' => $re->phone_ct]);
                return response()->json(['data' => 'Change Phone']);
            default:
                return response()->json(['data' => '11111111232321111111']);
        }
    }
}
