<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\MapsWorker;
use Illuminate\Auth\Events\Validated;

class MapsWorkerController extends Controller
{
    //
    public function index()
    {
        $da_maps = MapsWorker::all();

        return response()->json(['data'=>$da_maps]);
    }
    public function create(Request $request) {

        if(isset($request->id_worker) || $request->id_worker != null )
        {
            $n = new MapsWorker([
                'lat'=>$request->lat,
                'lng'=>$request->lng,
                'id_worker'=>$request->id_worker,
                'last_active'=>$request->last_active,
                'is_online' => 1,
            ]);
            $n -> save();

            return 'Create Local Done'; 
        }          
        else
        {
            return 'Fail Create Local - 401';
        }
    }
    public function update(Request $request)
    {
        if(isset($request->id_worker) || $request->id_worker != null )
        {
            MapsWorker::where('id_worker','=',$request->id_worker)->update([  'lat'=>$request->lat,'lng'=>$request->lng, 'last_active'=>$request->last_active,'is_online' => 1]);
           
            return 'Update Local Done'; 
        }          
        else
        {
            return 'Fail Update Local - 401';
        }
    }
    public function getOneWorker($id) {
        
        $da = MapsWorker::where('id_worker','=',$id)->get();

        if($da)
        {
            
             return response()->json($da);

        }
        else
        {
            return (' Không có thông');
        }

    }
}
