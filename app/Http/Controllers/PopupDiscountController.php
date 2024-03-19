<?php

namespace App\Http\Controllers;

use App\Models\PopupDiscount;
use Illuminate\Http\Request;

class PopupDiscountController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $all = PopupDiscount::all();

        return response()->json($all);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        if($request->hasFile('popup_image'))
        {
            $file = $request->file('popup_image');
            $name = $request->popup_title . '-' . time() . '.' . $file->extension();
            $file->move('assets/popup/', $name);
            $path = 'assets/popup/' . $name;
            $new_pop = new PopupDiscount([
                'popup_title'=>$request->popup_title,
                'popup_image'=>$path,
                'popup_discount'=>$request->popup_discount,
                'popup_description'=>$request->popup_discount,
                'popup_date_begin'=>$request->popup_date_begin,
                'popup_date_end'=>$request->popup_date_end,
                'popup_status'=>1,
            ]);
            $new_pop->save();
        }
        
        return response() -> json('ok');
    }

    /**
     * Display the specified resource.
     */
    public function show(PopupDiscount $popupDiscount)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(PopupDiscount $popupDiscount)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PopupDiscount $popupDiscount)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PopupDiscount $popupDiscount)
    {
        //
    }
}
