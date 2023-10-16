<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\OldCustomer;
use App\Models\Warranties;
use App\Models\Work;
use Carbon\Carbon;
use Illuminate\Http\Request;

class WarrantiesController extends Controller
{
    public static function insertWarranties(Request $req)
    {
        switch($req->unit)
                {
                    case 1:
                        $time_w = 'd';
                        break;
                    case 2:
                        $time_w = 'w';
                        break;
                    case 3:
                        $time_w = 'm';
                        break;
                    case 4:
                        $time_w = 'y';
                        break;
                    default :
                        $time_w = 'n';
                }
        $i = new Warranties([
            'id_work_has'=>$req->id_work_has,
            'warranty_time'=> $req->warranty_time,
            'warranty_info' => $req->warranty_info,
            'unit'=> $time_w,
        ]);
        $i->save();
        if($i)
        {
            return 'ok';
        }
        return 'non ok';
    }
    public function infoWarranty(Request $req)
    {
        if($req->id_cus)
        {

            $old_cus = OldCustomer::where('id','=',$req->id_cus)->get();
            if($old_cus->count()>0)
            {
                foreach($old_cus as $item)
                {
                    $work_note ='BH'. $item->worker_name.' - '.$item->date_book;
                    $a = Warranties::createNewWorkFromOldCus($item->name_cus,$work_note,$item->work_content,$item->add_cus,$item->des_cus,$item->phone_cus);
                    // dd($work_note);
                    return redirect() ->action('WorkController@home');
                }
            }
            else return '0';
        }
        if($req->id_work_has)
        {
           $i = 0;
           $output ='';
           $a = WarrantiesController::checkTimeWarranties($req->id_work_has,$req->date_book);
           $array_a = explode(',', $a);
           while($i < count($array_a))
           {
            if($array_a[$i] != null){
            //    echo $array_a[$i]."<br> ";
               $data = Warranties::where('id','=',$array_a[$i])->get();
               foreach($data as $item)
               {
                $time = WarrantiesController::timeWarranty($item->warranty_time, $item->unit);
                $output .='BH: '.$item->warranty_info.'--'.$time .'<br>' ;

               }
            }

            $i++;
           }
        }
    }
    public function createNewWorkFromOldCus($name_cus ,$work_note,$work_content,$street,$district,$phone_number)
    {
        $date = date('d-m-Y');
        $newWork = new Work([
            'name_cus'=> $name_cus,
            'date_book'=> $date ,
            'work_note'=> $work_note,
            'work_content'=> $work_content,
            'street'=> $street,
            'district'=> $district,
            'phone_number'=> $phone_number,
            'kind_work'=> '0'
        ]);
        // dd($newWork);
        $newWork->save();
        return '1';

    }
    public function checkTimeWarranties($id, $date_book)
    {
        // $id = $req->id;
        // $date_book = $req ->date_book;
        $date_now = date('d-m-Y');

        // $a
        $time_warranties = Warranties::where('id_work_has','=',$id)->get();
        if($time_warranties->count()>0)
        {
            $a='';
           foreach($time_warranties as $item)
           {
                switch($item->unit){
                    case 'd':
                        $tw = $item->warranty_time ;
                        break;
                    case 'w':
                        $tw = $item->warranty_time*7 ;
                        break;
                    case 'm':
                        $tw = $item->warranty_time*30 ;
                        break;
                    case 'y':
                        $tw = $item->warranty_time*365 ;
                        break;
                    default:
                        $tw = 0 ;
                        break;
                }
                // echo $tw.'<br>';
                $date_w = Carbon::create($date_book)-> addDays($tw)->isoFormat('DD-MM-YYYY');
                // echo $date_w .'------'. $date_now .'<br>';
                // echo strtotime($date_w) .'------'. strtotime($date_now).'<br>';
                $b = strtotime($date_w) - strtotime($date_now);
                // echo $b;
                if($b > 0)
                {
                    $a .= $item->id.',';
                    // echo '<br>'.$b.'<br>';
                }
                else
                    $a.= "Hết thời gian bảo hành";
           }
        //    echo $a;
        //    $str_a = implode(' ',$a);
        return $a;
        //   dd( $a);
        }
        else
            return 'Không bảo hành';
    }
    public static function getAllWarranties(Request $re)
    {
        // dd($re->all());
        $data = Warranties::where('id_work_has','=',$re->id)->get();
        if($data->count()>0){
            return response()->json(['data'=>$data]);
        }
        else
            return response()->json("Không BH");
    }
    public static function timeWarranty($time,$unit)
    {
        switch($unit){
            case 'd':
                $time_warranties = $time.' Ngày' ;
                return $time_warranties;
            case 'w':
                $time_warranties = $time*7 ;
                $time_warranties = $time_warranties.' Ngày';
                return $time_warranties;
            case 'm':
                $time_warranties = $time*30 ;
                $time_warranties = $time_warranties.' Ngày';
                return $time_warranties;
            case 'y':
                $time_warranties = $time*12 ;
                $time_warranties = $time_warranties.' Tháng';
                return $time_warranties;
            default:
                    $time_warranties = 'Không Bảo Hành';
                    return $time_warranties;
        }
    }

}
