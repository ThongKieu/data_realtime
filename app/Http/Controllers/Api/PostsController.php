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

        
        if ($request->hasFile('image_path')) {
           
            $image = $request->file('image');
            $name = time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
            $imge_post = $image->move('assets/post', $name);
        }
        else
        {
            $imge_post = '';
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
    public function update(Request $request)
    {

        if ($request->hasFile('image_path')) {
           
            $image = $request->file('image'); 
            $name = time() . rand(10, 100) . '.' . $image->getClientOriginalExtension();
            $imge_post = $image->move('assets/post', $name);
        }
        else
        {
            $imge_post = '';
        }
        //
        $title = $request->title;
        $slug= Str::slug($request->title);
        $description = $request->description;
        $content = $request ->content;
        // $imge_post = $request->image_path;
        // $author = Auth::user()->name;
        $author = $request->author;

        $u = Posts::where('id','=', $request->id_post)->update(['title'=>$title,'slug'=>$slug,'description'=>$description,'imge_post'=>$imge_post,'author'=>$author]);
        return 'Done';

    }
    public function delete(Request $request)
    {
        Posts::deleted('id','=',$request->id_post);
        return 'Done';
    }

    

}
