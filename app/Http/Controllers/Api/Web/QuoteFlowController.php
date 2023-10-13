<?php

namespace App\Http\Controllers\Api\Web;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\QuoteFlow;

class QuoteFlowController extends Controller
{
    //
    public function index() {
        
        return response()->json(QuoteFlow::all()->limit(100));
    }
}
