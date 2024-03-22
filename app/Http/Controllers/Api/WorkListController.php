<?php

namespace App\Http\Controllers\Api;

use App\Models\WorkList;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Http\Controllers\Controller;
use App\Imports\WorkListImport;
use Illuminate\Support\Facades\Validator;

class WorkListController extends Controller
{
    //
    public function index()
    {
        return response()->json(WorkList::all());
    }
    public static function changPhone($phone)
    {

        // dd($phone);
        $phone_c = substr($phone,0,-3);

        $phone_new = $phone_c.'xxx';
        return $phone_new;
    }
    public function delete()
    {
        WorkList::where('id','!=',0)->delete();
        
        return response()->json('Delete Done!');
    }
    public function importWork(Request $request)
    {
        if ($request->hasFile('file')) {
            // Kiểm tra xem tệp có phải là loại file Excel không
            $validator = Validator::make($request->all(), [
                'file' => 'required|mimes:xlsx,xls,csv'
            ]);
    
            // Nếu tệp không hợp lệ, trả về thông báo lỗi
            if ($validator->fails()) {
                return response()->json($validator->errors(), 400);
            }
    
            // Tiến hành nhập khẩu
            Excel::import(new WorkListImport(), $request->file);
    
            return response()->json('Import Done!');
        } else {
            // Trả về thông báo lỗi nếu không tìm thấy tệp
            return response()->json('File not found!', 400);
        }
    }
}
