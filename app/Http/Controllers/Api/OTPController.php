<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OTPController extends Controller
{
    //
    public function PushOtp(Request $request)  {
        $phone = $request->phone;
        // return $phone;
        $randomNumber = rand(100000, 999999);
        $curl = curl_init();
        curl_setopt_array($curl, array(
        CURLOPT_URL => 'http://210.211.109.118/apibrandname/SendOTP',
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 0,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS =>'{
        "phone":"'.$phone.'",
        "password":"CongTyThoViet@)!!%*%^*",
        "message":"THOVIET.VN thong bao Ma OTP cua Quy Khach qua Tho Viet la '.$randomNumber.'. Ma co hieu luc trong vong 3 phut. Tuyet doi khong cung cap ma OTP nay voi nguoi khac!",
        "idrequest":"1614150957093",
        "brandname":"THOVIET.VN",
        "username":"thoviet2023",
        }',
        CURLOPT_HTTPHEADER => array(
            'Content-Type: text/plain'
        ),
        ));

        $response = curl_exec($curl);

        curl_close($curl);
        return $randomNumber;
        }
    
}
