<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\MapsWorker;
use Illuminate\Auth\Events\Validated;

class MapsWorkerController extends Controller
{
    //
    public function index()
    {
        $da_maps = DB::table('maps_workers')->join('workers','maps_workers.id_worker','=','workers.id')->get(
            [
            "maps_workers.id",
            "id_worker",
            "lat",
            "lng",
            "last_active",
            "is_online",
            "worker_full_name",
            "worker_code","worker_status","worker_phone_company"
        ]
    );

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
    public function getOneWorker(Request $request) {

        $da = MapsWorker::where('id_worker','=',$request->id)->get();

        if(count($da) == 1)
        {

            //  return response()->json($da);
             return response()->json(['data'=>$da]);
        }
        else
        {
            return (' Không có thông tin !!!!!!');
        }

    }
}
