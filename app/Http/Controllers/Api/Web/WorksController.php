<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Api\NoticationAllController;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreWorkRequest;
use App\Models\Work;
use App\Models\WorksAssignment;
use Carbon\Carbon;
// use Illuminate\Database\Query\Builder;
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
        $dien_nuoc = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 1)
            ->where('status_cus', '=', 0)
            ->get();
        $dien_nuoc_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 1)
            ->where('status_cus', '=', 0)
            ->get();
        // dd($dien_nuoc_cu);
        $dien_lanh = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 2)
            ->where('status_cus', '=', 0)
            ->get();

        $dien_lanh_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 2)
            ->where('status_cus', '=', 0)
            ->get();
        $do_go = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 3)
            ->where('status_cus', '=', 0)
            ->get();

        $do_go_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 3)
            ->where('status_cus', '=', 0)
            ->get();
        $nlmt = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 4)
            ->where('status_cus', '=', 0)
            ->get();

        $nlmt_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 4)
            ->where('status_cus', '=', 0)
            ->get();
        $xay_dung = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 5)
            ->where('status_cus', '=', 0)
            ->get();
        $xay_dung_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 5)
            ->where('status_cus', '=', 0)
            ->get();
        $tai_xe = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 6)
            ->where('status_cus', '=', 0)
            ->get();
        $tai_xe_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 6)
            ->where('status_cus', '=', 0)
            ->get();
        $co_khi = Work::where('date_book', '=', $today)
            ->where('kind_work', '=', 7)
            ->where('status_cus', '=', 0)
            ->get();
        $co_khi_cu = Work::whereBetween('date_book', [$dc2, $dc1])
            ->where('kind_work', '=', 7)
            ->where('status_cus', '=', 0)
            ->get();
        $number = count($dien_nuoc) + count($dien_lanh) + count($do_go) + count($nlmt) + count($xay_dung) + count($tai_xe) + count($co_khi) + count($dien_nuoc_cu) + count($dien_lanh_cu) + count($do_go_cu) + count($nlmt_cu) + count($xay_dung_cu) + count($tai_xe_cu) + count($co_khi_cu);
        $dataWork = [
            'dien_nuoc' => $dien_nuoc,
            'dien_nuoc_cu' => $dien_nuoc_cu,
            'dien_lanh' => $dien_lanh,
            'dien_lanh_cu' => $dien_lanh_cu,
            'do_go' => $do_go,
            'do_go_cu' => $do_go_cu,
            'nlmt' => $nlmt,
            'nlmt_cu' => $nlmt_cu,
            'xay_dung' => $xay_dung,
            'xay_dung_cu' => $xay_dung_cu,
            'tai_xe' => $tai_xe,
            'tai_xe_cu' => $tai_xe_cu,
            'co_khi' => $co_khi,
            'co_khi_cu' => $co_khi_cu,
            'dem_lich' => $number,
        ];
        return response()->json($dataWork);
    }
    public function indexSetWork(Request $request)
    {
        // get data not set for worker
        if ($request->dateCheck) {
            $today = $request->dateCheck;
        } else {
            $today = date('Y-m-d');
        }

        $dien_nuoc = Work::where('kind_work', '=', '1')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $dien_lanh = Work::where('kind_work', '=', '2')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $do_go = Work::where('kind_work', '=', '3')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $nlmt = Work::where('kind_work', '=', '4')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $xay_dung = Work::where('kind_work', '=', '5')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $tai_xe = Work::where('kind_work', '=', '6')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $co_khi = Work::where('kind_work', '=', '7')->where('status_cus', '=', 1)->where('date_book', '=', $today)->get();
        $number = count($dien_nuoc) + count($dien_lanh) + count($do_go) + count($nlmt) + count($xay_dung) + count($tai_xe) + count($co_khi);
        $dataWorkDone = [
            'dien_nuoc_done' => $dien_nuoc,
            'dien_lanh_done' => $dien_lanh,
            'do_go_done' => $do_go,
            'nlmt_done' => $nlmt,
            'xay_dung_done' => $xay_dung,
            'tai_xe_done' => $tai_xe,
            'co_khi_done' => $co_khi,
            'dem_lich_done' => $number,
        ];
        return response()->json($dataWorkDone);
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
