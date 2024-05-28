<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Imagick\Driver;
use Intervention\Image\Encoders\AutoEncoder;
use Intervention\Image\Encoders\WebpEncoder;

class ImageCustomController extends Controller
{
    //
    public function index(Request $re) 
    {

        dd($re->all());
        return view('welcome');
    }
    public static function optimizeImage(Request $request)
    {
         $image = $request->file('file-0');
        // dd($request->image);
        // Kiểm tra nếu có hình ảnh được tải lên
        // if (!$image) {
        //     return response()->json(['error' => 'Vui lòng chọn hình ảnh để tối ưu hóa'], 400);
        // }
        // dd($image);

        // Tạo instance của ImageManager
        $manager = new ImageManager(new Driver());

        // reading jpeg image
        $image = $manager->read($image);
        // encode as the originally read image format
        // $encoded = $image->encodeByExtension(quality: 10);
        $encoded = $image->encode(new WebpEncoder(quality: 65));
        // Mở hình ảnh
        // $image = $manager->make($image->getRealPath());

        // Tối ưu hóa hình ảnh
        // $image->optimize();

        // Lưu hình ảnh đã tối ưu hóa
        $image->save('im_op.jpg');

        return response()->json(['message' => 'Hình ảnh đã được tối ưu hóa thành công'], 200);
    
    }
}
