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

        //
        $title = $request->title;
        $slug= Str::slug($request->title);
        $description = $request->description;
        $content = $request ->content;
        $imge_post = $request->image_path;
        // $author = Auth::user()->name;
        $author = $request->author;

        $post = new Posts ;
        $post->title = $title;
        $post->slug = $slug;
        $post->description = $description;
        $post->content = $content;
        $post ->image_post = $imge_post;
        $post->name_author = $author;
        $post-> save();

        if($post)
        {
            return response()->json(['status'=>'Thêm Thành Công']);
        }
        else
        return response()->json(['status'=>'Thêm thất bại']);

    }
}
