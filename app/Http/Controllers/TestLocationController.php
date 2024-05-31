<?php

namespace App\Http\Controllers;

use App\Models\TestLocation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TestLocationController extends Controller
{
    public function insertLocation(Request $request)
    {
        // request
        $idWorker = $request->idWorker;
        $address = $request->address;
        $lat = $request->lat;
        $lng = $request->lng;
        $time = $request->time;

        // save database
        $testLocation = new TestLocation([
            'id_worker' => $idWorker,
            'address' => $address,
            'lat' => $lat,
            'lng' => $lng,
            'time' => $time,

        ]);

        // check
        $testLocation->save();
        if ($testLocation) {
            return 1;
        } else {
            return 0;
        }
    }

    public function getLocation(Request $request)
    {
        // $testLocation = TestLocation::where('id_worker', '=', $request->idWorker)->get();
        $testLocation = DB::table('test_locations')->where('id_worker', '=', $request->idWorker)->get();
        return $testLocation;
    }
}