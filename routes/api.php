<?php

use App\Http\Controllers\Api\DistrictController;
// use App\Http\Controllers\Api\Web\PushOnlineController;
use App\Http\Controllers\Api\Web\WorksController;
use App\Http\Controllers\Api\Web\WorkersController;
// use App\Http\Controllers\Api\WorksAssignmentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::prefix('web')->group(function () {
    Route::apiResource('works',WorksController::class);
    Route::apiResource('workers',WorkersController::class);
    Route::apiResource('district',DistrictController::class);
    Route::post('push-online','App\Http\Controllers\Api\Web\PushOnlineController@updateOnline');
    Route::get('list-online','App\Http\Controllers\Api\Web\PushOnlineController@listOnline');
    Route::prefix('update')->group(function(){
        Route::post('worker','App\Http\Controllers\Api\Web\WorkersController@updateWorker');
        Route::post('work','App\Http\Controllers\Api\Web\WorksController@updateWork');
        Route::post('work-assignment','App\Http\Controllers\Api\Web\WorksController@updateWorkAss');
    });
    Route::get('works_done','App\Http\Controllers\Api\Web\WorksController@indexSetWork');
    Route::get('works_cacle','App\Http\Controllers\Api\Web\WorksController@indexCancleBook');
    Route::post('works_cacle','App\Http\Controllers\Api\Web\WorksAssignmentController@insertCancleBook');
    Route::prefix('work-assignment')->group(function(){
        Route::post('','App\Http\Controllers\Api\WorksAssignmentController@workAssignWorker');
        Route::get('all','App\Http\Controllers\Api\WorksAssignmentController@allWorkAssign');
    });
    Route::get('worker-account','App\Http\Controllers\AccountionWorkerController@getAllWorkersAcctive');
    Route::get('popup-discount','App\Http\Controllers\ViewSaleController@getAllPopupDiscount');
    Route::prefix('import')->group(function () {
        Route::post('oldcus','App\Http\Controllers\Api\OldCustomersController@importCus');
    });
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
