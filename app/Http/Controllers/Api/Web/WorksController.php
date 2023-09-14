<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkRequest;
use App\Models\Work;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WorksController extends Controller
{
    //
    // public function __invoke() {
        
    // }
    public function index (Request $request)
    {
        // get data not set for worker
        if($request->dateCheck)
        {
            $today = $request->dateCheck;
        }
        else
        {
            $today = date('Y-m-d');
        }
        
        $dien_nuoc =    Work::where('date_book','=',$today)->where('kind_work','=','0')->where('status_cus','=',0)->get();
        $dien_lanh =    Work::where('date_book','=',$today)->where('kind_work','=','1')->where('status_cus','=',0)->get();
        $do_go     =    Work::where('date_book','=',$today)->where('kind_work','=','2')->where('status_cus','=',0)->get();
        $nlmt      =    Work::where('date_book','=',$today)->where('kind_work','=','3')->where('status_cus','=',0)->get();
        $xay_dung  =    Work::where('date_book','=',$today)->where('kind_work','=','4')->where('status_cus','=',0)->get();
        $tai_xe    =    Work::where('date_book','=',$today)->where('kind_work','=','5')->where('status_cus','=',0)->get();
        $co_khi    =    Work::where('date_book','=',$today)->where('kind_work','=','6')->where('status_cus','=',0)->get();
        $number = count($dien_nuoc) + count($dien_lanh) + count($do_go ) + count( $nlmt )+ count($xay_dung) + count($tai_xe) + count( $co_khi);
        $dataWork = [
            'dien_nuoc'=>$dien_nuoc,
            'dien_lanh'=>$dien_lanh,
            'do_go'=>$do_go,
            'nlmt'=>$nlmt,
            'xay_dung'=>$xay_dung,
            'tai_xe'=>$tai_xe,
            'co_khi'=>$co_khi,
            'dem_lich'=>$number,
        ];
        return response()->json( $dataWork);
    }
    public function indexSetWork (Request $request)
    {
        // get data not set for worker
        if($request->dateCheck)
        {
            $today = $request->dateCheck;
        }
        else
        {
            $today = date('Y-m-d');
        }
        
        $dien_nuoc =    Work::where('date_book','=',$today)->where('kind_work','=','0')->where('status_cus','=',1)->get();
        $dien_lanh =    Work::where('date_book','=',$today)->where('kind_work','=','1')->where('status_cus','=',1)->get();
        $do_go     =    Work::where('date_book','=',$today)->where('kind_work','=','2')->where('status_cus','=',1)->get();
        $nlmt      =    Work::where('date_book','=',$today)->where('kind_work','=','3')->where('status_cus','=',1)->get();
        $xay_dung  =    Work::where('date_book','=',$today)->where('kind_work','=','4')->where('status_cus','=',1)->get();
        $tai_xe    =    Work::where('date_book','=',$today)->where('kind_work','=','5')->where('status_cus','=',1)->get();
        $co_khi    =    Work::where('date_book','=',$today)->where('kind_work','=','6')->where('status_cus','=',1)->get();
        $number = count($dien_nuoc) + count($dien_lanh) + count($do_go ) + count( $nlmt )+ count($xay_dung) + count($tai_xe) + count( $co_khi);
        $dataWorkDone = [
            'dien_nuoc_done'=>$dien_nuoc,
            'dien_lanh_done'=>$dien_lanh,
            'do_go_done'=>$do_go,
            'nlmt_done'=>$nlmt,
            'xay_dung_done'=>$xay_dung,
            'tai_xe_done'=>$tai_xe,
            'co_khi_done'=>$co_khi,
            'dem_lich_done'=>$number,
        ];
        return response()->json( $dataWorkDone);
    }
    public function indexCancleBook(Request $request)
    {   if($request->dateCheck)
        {
            $today = $request->dateCheck;
        }
        else
        {
            $today = date('Y-m-d');
        }
        $co_khi    =   Work::where('date_book','=',$today)->where('status_cus','=',2)->get('id');
        return response()->json( count($co_khi));
    }
    public function store (StoreWorkRequest $request)
    {
        Work::create($request->validated());
        // dd($request->all());

        $id = Work::where('phone_number','=',$request->phone_number)->where('work_content','=',$request->work_content)->value('id');
        $files = '';

        if($request->hasfile('image_work_path'))
		{
			foreach($request->file('image_work_path') as $file)
			{
			    $name = $id.'-'.time().rand(10,100).'.'.$file->extension();
                $file->move('assets/images/work', $name);
			    $files = $files.'assets/images/work/'.$name.',';
            }
            // $serializedArr = json_encode($files);
            DB::table('works')->where('works.id', '=', $id)-> update(['works.image_work_path'=>$files]);
			// Work::where('id','=',$id)->update(['image_work_path'=>"'".$serializedArr."'"]);
            return response()->json('Add image Done');
		}
        return response()->json('Create Work Done');

    }

    public function update(StoreWorkRequest $request, Work $work )
    {
        // dd($request);
        $work->update($request->validated());
        return response()->json('Update Work done');

    }
    public static function upload($file)
    {
        if ($file->hasFile('image')) {
            $image = $file->file('image');
            $imageName = time() . '.' . $image->getClientOriginalExtension();
            $image->move(public_path('uploads'), $imageName);

            return response()->json(['message' => 'Image uploaded successfully']);
        }

        return response()->json(['message' => 'No image uploaded'], 400);
    }
}
