<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Api\NoticationAllController;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkRequest;
use App\Models\CodeWorkerKind;
use App\Models\Work;
use App\Models\WorksAssignment;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;


class WorksController extends Controller
{
    //
    // public function __invoke() {

    // }
    public function index(Request $request)
    {
        // get data not set for worker
        // dd($request->dateCheck);
        if ($request->dateCheck) {
            $today = $request->dateCheck;

        } else {
            $today = date('Y-m-d');
        }

        $oldday2 = Carbon::now();
        $dc1 = $oldday2->subDay(1)->isoFormat('YYYY-MM-DD');
        $dc2 = $oldday2->subDay(7)->isoFormat('YYYY-MM-DD');
        // dd($dc1);
        $workerKinds = CodeWorkerKind::where('id','>',0)->where('status_code_worker','=',1)->get('kind_worker');
        // dd( );
        $data_json = [];
        foreach ($workerKinds as $kindId => $kindWorker) {
            $data_json[$kindId]['kind_worker'] = new \stdClass();
            $data_json[$kindId]['kind_worker']->nameKind = $kindWorker->kind_worker;
            $data_json[$kindId]['data'] = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', $kindId+1)
            ->where('status_cus', '=', 0)
            ->get();
            $data_json[$kindId]['kind_worker']->numberOfWork =count($data_json[$kindId]['data']);
            $data_json[$kindId]['oldWork']=Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=',  $kindId+1)
            ->where('status_cus', '=', 0)
            ->get();
        }


        return response()->json($data_json);
    }
    public function indexSetWork(Request $request)
    {
        // get data not set for worker
        if ($request->dateCheck) {
            $today = $request->dateCheck;
        } else {
            $today = date('Y-m-d');
        }

        $dataWorkDone = Work::whereBetween('kind_work', [1, 7])->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();

        return response()->json(count($dataWorkDone));
    }
    public function getCancleBook(Request $request)
    {
        if ($request->dateCheck) {
            $today = $request->dateCheck;
        } else {
            $today = date('Y-m-d');
        }
        $co_khi = DB::table('works')
            ->join('users', 'works.member_read', '=', 'users.id')
            ->where('works.date_book', '=', $today)
            ->where('works.status_cus', '=', 2)
            ->limit(100)
            ->get([

                "works.id",
                "works.work_content",
                "works.name_cus",
                "works.date_book",
                "works.work_note",
                "works.street",
                "works.district",
                "works.phone_number",
                "works.image_work_path",
                "users.name",
            ]);
        $nu_can = count($co_khi);
        return response()->json([
            'num_can' => $nu_can,
            'info_can' => $co_khi,
        ]);
    }
    public function store(StoreWorkRequest $request)
    {
        Work::create($request->validated());
        // dd($request->all());

        $id = Work::where('phone_number', '=', $request->phone_number)->where('work_content', '=', $request->work_content)->orderBy('id', 'asc')->limit(1)->value('id');
        $files = '';

        if ($request->hasfile('image_work_path')) {
            foreach ($request->file('image_work_path') as $file) {
                $name = $id . '-' . time() . rand(10, 100) . '.' . $file->extension();


                // Test image resize
                // $image = ImageManager::imagick()->read($file);
                // $image->scaleDown(width:600);

                // dd($image);
                $file->move('assets/images/work/' . $id, $name);
                $files = $files . 'assets/images/work/' . $id . '/' . $name . ',';
            }
            // $serializedArr = json_encode($files);
            DB::table('works')->where('works.id', '=', $id)->update(['works.image_work_path' => $files]);
            // Work::where('id','=',$id)->update(['image_work_path'=>"'".$serializedArr."'"]);
            if (isset($request->from_app)) {
                NoticationAllController::create('2', $request->content, '');

            }

            if ($request->id_worker) {
                Work::where('id', '=', $id)->update(['status_cus' => 1]);
                $workHas = new WorksAssignment([
                    'id_cus' => $id,
                    'id_worker' => $request->id_worker,
                ]);
                $workHas->save();
            }
            return 1;
        } else {
            if (isset($request->from_app)) {
                NoticationAllController::create('2', $request->content, '');
            }
            if ($request->id_worker) {
                Work::where('id', '=', $id)->update(['status_cus' => 1]);
                $workHas = new WorksAssignment([
                    'id_cus' => $id,
                    'id_worker' => $request->id_worker,
                ]);
                $workHas->save();
            }
            return 1;

        }
    }

    public function updateWork(Request $request)
    {
        // dd($request->all());
        switch ($request->ac) {
            case ('1'):
                $content = Work::where('id', '=', $request->id)->update(['work_content' => $request->work_content]);
                break;
            case ('2'):
                $content = Work::where('id', '=', $request->id)->update(['work_note' => $request->work_note]);
                break;
            case ('3'):
                $content = Work::where('id', '=', $request->id)->update(['street' => $request->street]);
                break;
            case ('4'):
                $content = Work::where('id', '=', $request->id)->update(['district' => $request->district]);
                break;
            case ('5'):
                $content = Work::where('id', '=', $request->id)->update(['phone_number' => $request->phone_number]);
                break;
        }
        if (isset($content)) {
            return response()->json('Update Work done - !! ');
        }
        return response()->json('Update Work fail !!!!!!!!!');
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
    public function insertCancleBook(Request $request)
    {
        // dd($request);
        $up = Work::where('id', '=', $request->id)->update(['status_cus' => 2, 'work_note' => $request->work_note, 'member_read' => $request->auth_id]);
        if ($up) {
            return 'Delete work done !';
        }
        return 'Delete Failse !';
    }
}
