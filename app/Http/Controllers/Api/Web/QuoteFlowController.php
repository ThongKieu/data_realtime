<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuoteFlow;

class QuoteFlowController extends Controller
{
    //
    public function index() {
        $q = QuoteFlow::limit(100)->get();
       
        return response()->json($q);
    }
    public function store(Request $request)
    {
        
    }
    public function update(Request $request)
    {
        
    }
}
