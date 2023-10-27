<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Products;

class ProductsController extends Controller
{
    public function index()
    {
        return response()->json(Products::all());
    }
    public function create(Request $request)
    {
        // dd($request->all());
        $new_pro = new Products([
            "name_product" => $request->name_product,
            "code_product" => $request->code_product,
            "provider_product" => $request->provider_product,
            "phone_product" => $request->phone_product,
            "price_product" => $request->price_product,
            "sale_price_product" => $request->sale_price_product,
        ]);
        $new_pro->save();
        if ($new_pro) {
            return response()->json('status');
        } else
            return response()->json('None OK');
    }
    public function getOne(Request $request) {
        $one_pro = Products::where('id','=',$request->id)->get([ "name_product",
        "code_product" ,
        "provider_product",
        "phone_product" ,
        "price_product" ,
        "sale_price_product" ,'image_product']);
        return response()->json($one_pro);
    }
}
