<?php

namespace App\Http\Controllers\Api\Mobile;

use App\Http\Controllers\Controller;
use App\Models\Banners;
use Illuminate\Http\Request;

class BannersController extends Controller
{
    public function index()
    {
        //
        $banners = Banners::all();
       
        return response()->json($banners);
    }

    public function store(Request $request)
    {
            $save = new Banners();

            $save->image_path = $request->image;

            $save->save();

            return response()-> json('Lưu Thành Công');
    }

    public function update(Request $request, $id)
    {
        // dd($request);
        $banner = Banners::find($id);

        $banner->image_path = $request->image;

        $banner->update();
        return redirect()->action('BannerController@index')->with('status','Cập Nhật Thông tin Thành Công');
    }
   public function create_new(Request $request)
    {
        
            $save = new Banners();
            $save->local_use = $request->local_use;
            $save->save();

            return back()->with('status', 'Tạo Thành Công');
    }
    public function addImage($file)
    {

    }
}
