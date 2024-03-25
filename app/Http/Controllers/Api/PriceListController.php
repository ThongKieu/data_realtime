<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Imports\PriceListImport;
use App\Models\PriceList;
use Illuminate\Http\Request;
// use Maatwebsite\Excel\Excel;
use Maatwebsite\Excel\Facades\Excel;

class PriceListController extends Controller
{
    public function create(Request $request)
    {
        if ($request->hasFile('image')) {
           
            $image = $request->file('image');
            $storedPath = $image->move('assets/prices', $image->getClientOriginalName());
        }

        $priceList = new PriceList([
            'ID_price_list' => $request->ID_price_list,
            'name_price_list' => $request->name_price_list,
            'price' => $request->price,
            'info_price' => $request->info_price,
            'image_price' => $storedPath,
            'note_price' => $request->note_price,
        ]);
        $priceList->save();
    }

    public function update(Request $request, PriceList $priceList)
    {

        // $name_price_list = $request->name_price_list;
        // $price = $request->price;
        // $info_price = $request->info_price;
        // $image_price =  $request->image_price;
        // $note_price = $request->note_price;
        $image = $request->file('image');
        // dd($image);
        $storedPath = $image->move('assets/prices', $image->getClientOriginalName());

        $id  = $request->id;
        $priceList = PriceList::find($id);
        $priceList->ID_price_list = $request->ID_price_list;
        $priceList->name_price_list = $request->name_price_list;
        $priceList->price = $request->price;
        $priceList->info_price = $request->info_price;
        $priceList->image_price = $storedPath;
        $priceList->note_price = $request->note_price;
        $priceList->save();
        return  response()->json('Done');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\PriceList  $priceList
     * @return \Illuminate\Http\Response
     */
    public function destroy(PriceList $priceList)
    {
        //
    }
    public function getPriceList()
    {
        $priceList = PriceList::all();
        if ($priceList) {
            return response()->json([
                "message" => "Có thông tin",
                "code" => 200,
                "data" => $priceList
            ]);
        } else
            return response()->json([
                "message"  => "kết nối thất bại",
                "code" => 500
            ]);
    }
    public function viewPriceList()
    {
        return view('admin.data_imp.importPriceList');
    }
    public function importPriceList(Request $request)
    {
        Excel::import(new PriceListImport, $request->file);

        return response()->json('Import Done !');
    }
    public  function getPriceByID($id)
    {
        // dd($id);
        $find = PriceList::where('ID_price_list', '=', $id)->get();
        if ($find) {
            return $find;
        } else
            return response()->json([
                "message"  => "kết nối thất bại",
                "code" => 500
            ]);
    }
}
