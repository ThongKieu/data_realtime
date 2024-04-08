<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use App\Models\Posts;

class PostsController extends Controller
{
    public function index()
    {
        $post = Posts::all();

        return response()->json($post);
    }
    public function store(Request $request)
    {

        // dd($request->all());
        if ($request->hasFile('image_post')) {

            $image = $request->file('image_post');
            // dd($image->getClientOriginalExtension());
            $name = time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();

            $image_post = $image->move('assets/post', $name);
        }
        else
        {
            $image_post = '';
        }
        //
        $title = $request->title;
        $slug= Str::slug($request->title);
        $description = $request->description;
        $content = $request ->content;
        // $imge_post = $request->image_path;
        // $author = Auth::user()->name;
        $author = $request->author;

        $post = new Posts ;
        $post->title = $title;
        $post->slug = $slug;
        $post->description = $description;
        $post->content = $content;
        $post ->image_post = $image_post;
        $post->name_author = $author;
        $post-> save();

        if($post)
        {
            return response()->json(['status'=>'Thêm Thành Công']);
        }
        else
        return response()->json(['status'=>'Thêm thất bại']);

    }
    public function update(Request $request)
    {
        dd($request->all());
        if ($request->hasFile('image_post')) {

            $image = $request->file('image_post');
            $name = time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
            $image_post = $image->move('assets/post', $name);
        }
        else
        {
            $image_post = '';
        }
        //
        $title = $request->title;
        $slug= Str::slug($request->title);
        $description = $request->description;
        $content = $request ->content;
        // $imge_post = $request->image_path;
        // $author = Auth::user()->name;
        $author = $request->author;

        $u = Posts::where('id','=', $request->id_post)->update(['title'=>$title,'slug'=>$slug,'description'=>$description,'content'=>$content,'image_post'=>$image_post,'name_author'=>$author]);

        if($u){
            return 'Done';
        }
        return 'Fail';

    }
    public function delete(Request $request)
    {
        Posts::deleted('id','=',$request->id_post);
        return 'Done';
    }



}
