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
        if (!$request->hasFile('file-0')) {
            return response()->json(['error' => 'Vui lòng chọn ít nhất một hình ảnh để tối ưu hóa'], 400);
        }
    
        // Lặp qua mỗi file gửi lên và tối ưu hóa
        foreach ($request->file() as $key => $file) {
            // Tạo instance của ImageManager
            $manager = new ImageManager(new Driver());
    
            // Đọc hình ảnh
            $image = $manager->read($file);
    
            // Tối ưu hóa hình ảnh dưới dạng WebP với chất lượng 65
            $encoded = $image->encode(new WebpEncoder(quality: 65));
    
            // Lưu hình ảnh đã tối ưu hóa với tên mới
            $image->save('im_op_'.$key.'.webp');
        }
        return response()->json(['message' => 'Hình ảnh đã được tối ưu hóa thành công'], 200);
    
    }
}
