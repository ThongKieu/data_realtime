<?php

use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\Mobile\WorkersController;
use App\Http\Controllers\Api\PostsController;
use App\Http\Controllers\Api\Web\WorksController;
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
    Route::apiResource('works', WorksController::class);
    Route::prefix('workers')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\Web\WorkerController@getAllWorkers');
        Route::post('/addNew', 'App\Http\Controllers\Api\Web\WorkerController@addNewWorker');
        Route::post('/create_acc', 'App\Http\Controllers\Api\Web\WorkerController@createAcc');
        Route::post('/create_acc_from_tab', 'App\Http\Controllers\Api\Web\WorkerController@createAccFromTab');
        Route::get('/account', 'App\Http\Controllers\AccountionWorkerController@getAllWorkersAcctive');
        // use for web and app
        Route::post('/changePass', 'App\Http\Controllers\AccountionWorkerController@changePass');
        // ------------------------------------------------------------------------------------------
        Route::post('/updateActive', 'App\Http\Controllers\AccountionWorkerController@updateActive');
    });
    Route::apiResource('district', DistrictController::class);
    Route::post('push-online', 'App\Http\Controllers\Api\Web\PushOnlineController@updateOnline');
    Route::get('list-online', 'App\Http\Controllers\Api\Web\PushOnlineController@listOnline');
    Route::prefix('update')->group(function () {
        Route::post('worker', 'App\Http\Controllers\Api\Web\WorkerController@updateWorker');
        Route::post('work', 'App\Http\Controllers\Api\Web\WorksController@updateWork');
        Route::post('work-continue', 'App\Http\Controllers\Api\WorksAssignmentController@continueWorkAss');
        Route::post('work-assignment-return', 'App\Http\Controllers\Api\WorksAssignmentController@returnWorkFromAssignment');
        Route::post('work-assignment-cancle', 'App\Http\Controllers\Api\WorksAssignmentController@cancelWorkFromAssignment');
        Route::post('work-assignment-quote', 'App\Http\Controllers\Api\WorksAssignmentController@insertQuoteWorkFromAssignment');
        Route::post('work-assignment-warranties', 'App\Http\Controllers\Api\WarrantiesController@insertWarranties');
        Route::post('check-admin', 'App\Http\Controllers\Api\WorksAssignmentController@checkWorkByAdmin');
    });
    Route::prefix('cancle')->group(function () {
        Route::get('works', 'App\Http\Controllers\Api\Web\WorksController@getCancleBook');
        Route::post('works', 'App\Http\Controllers\Api\Web\WorksController@insertCancleBook');
        Route::post('workassignment', 'App\Http\Controllers\Api\WorksAssignmentController@insertCancleBook');
    });

    Route::get('works_done', 'App\Http\Controllers\Api\Web\WorksController@indexSetWork');

    Route::prefix('work-assignment')->group(function () {
        Route::post('', 'App\Http\Controllers\Api\WorksAssignmentController@workAssignWorker');
        Route::get('', 'App\Http\Controllers\Api\WorksAssignmentController@allWorkAssign');
        Route::get('/warranties', 'App\Http\Controllers\Api\WarrantiesController@getAllWarranties');
        Route::post('/quote', 'App\Http\Controllers\Api\WorksAssignmentController@insertQuoteWork');
        Route::post('/returnWork', 'App\Http\Controllers\Api\WorksAssignmentController@returnWork');
        Route::post('/setActive', 'App\Http\Controllers\Api\WorksAssignmentController@setActive');
    });
     
    

    Route::prefix('quote')->group(function () {
        Route::get('', 'App\Http\Controllers\Api\Web\QuoteFlowController@index');
        Route::get('users', 'App\Http\Controllers\Api\Web\QuoteFlowController@getAdminName');
        Route::post('', 'App\Http\Controllers\Api\Web\QuoteFlowController@store');
        Route::post('/update', 'App\Http\Controllers\Api\Web\QuoteFlowController@update');
    });

    // Route::get('popup-discount','App\Http\Controllers\ViewSaleController@getAllPopupDiscount');
    Route::prefix('import')->group(function () {
        Route::post('data-customer', 'App\Http\Controllers\Api\Web\OldCustomersController@importDataCustomer');
        Route::post('data-worker', 'App\Http\Controllers\Api\Web\WorkerController@importDataWorker');
        Route::post('data-check-call-worker', 'App\Http\Controllers\Api\Web\CheckCallWorkerController@importDataCheckCallWorker');
        Route::post('data-work-list', 'App\Http\Controllers\Api\WorkListController@importWork');
    });
    Route::prefix('users')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\UsersAdminController@index');
        Route::post('/', 'App\Http\Controllers\Api\UsersAdminController@create');
        Route::post('/respw', 'App\Http\Controllers\Api\UsersAdminController@resetPassAdmin');
        Route::post('/resper', 'App\Http\Controllers\Api\UsersAdminController@resetPerAdmin');
    });
    // worker
    Route::get('all-workers', 'App\Http\Controllers\Api\Web\WorkerController@getAllWorkers');
    Route::get('all-check-call-workers', 'App\Http\Controllers\Api\Web\CheckCallWorkerController@getAllCheckCallWorkers');
    Route::prefix('worker')->group(function () {
        Route::get('all-workers', 'App\Http\Controllers\Api\Web\WorkerController@getAllWorkers');
        Route::get('all-check-call-workers', 'App\Http\Controllers\Api\Web\CheckCallWorkerController@getAllCheckCallWorkers');
    });
    //products
    Route::prefix('product')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\ProductsController@index');
        Route::post('/', 'App\Http\Controllers\Api\ProductsController@create');
        Route::get('getone', 'App\Http\Controllers\Api\ProductsController@getOne');
    });
    // Price list
    Route::prefix('price-list')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\PriceListController@getPriceList');
        Route::post('/', 'App\Http\Controllers\Api\PriceListController@create');
        Route::post('/update', 'App\Http\Controllers\Api\PriceListController@update');

    });
    Route::get('worker-with-type', 'App\Http\Controllers\Api\Web\WorkerController@getWorkerWithType');
    Route::prefix('search')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\SearchController@index');
        Route::post('/', 'App\Http\Controllers\Api\SearchController@searchAjax');
        Route::post('/warranty', 'App\Http\Controllers\Api\SearchController@createWarrantyFromSearch');
        Route::get('/warranty', 'App\Http\Controllers\Api\SearchController@getWarraties');
    });

    Route::prefix('noti')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\NoticationAllController@index');
        Route::get('soket_noti', 'App\Http\Controllers\Api\NoticationAllController@soketNoti');
        Route::post('markReadAll', 'App\Http\Controllers\Api\NoticationAllController@markReadAll');
    });
    Route::prefix('popup-discount')->group(function () {
        Route::get('/', 'App\Http\Controllers\PopupDiscountController@index');
        Route::post('store', 'App\Http\Controllers\PopupDiscountController@store');
        Route::post('fix', 'App\Http\Controllers\PopupDiscountController@edit');
    });
    Route::prefix('work-list')->group(function () {
        Route::get('/', 'App\Http\Controllers\Api\WorkListController@index');
        // Route::post('store', 'App\Http\Controllers\PopupDiscountController@store');
        // Route::post('delete', 'App\Http\Controllers\WorkListController@delete');
    });
})->withoutMiddleware("throttle:api")
    ->middleware(
        \Illuminate\Routing\Middleware\ThrottleRequests::with(
            maxAttempts: 300,
            decayMinutes: 1
        )
    );
// Route::apiResource('posts', ::class);
//Maps
Route::prefix('posts')->group(function () {
    Route::get('/', 'App\Http\Controllers\Api\PostsController@index');
    Route::post('/', 'App\Http\Controllers\Api\PostsController@store');
    Route::post('/{id}', 'App\Http\Controllers\Api\PostsController@update');
    Route::post('/delete/{id}', 'App\Http\Controllers\Api\PostsController@delete');
});
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('smsBrand', 'App\Http\Controllers\Api\OTPController@PushOtp');
Route::get('getSmsBrand', 'App\Http\Controllers\Api\OTPController@GetSms');
// --------------------------------------------------------------------------//
//Maps
Route::prefix('maps')->group(function () {
    Route::get('/', 'App\Http\Controllers\Api\MapsWorkerController@index');
    Route::post('/', 'App\Http\Controllers\Api\MapsWorkerController@create');
    Route::post('/{id}', 'App\Http\Controllers\Api\MapsWorkerController@update');
    Route::get('worker', 'App\Http\Controllers\Api\MapsWorkerController@getOneWorker');
});
// Fuel - Over Time Worker 
Route::prefix('fuel-ot')->group(function () {
    Route::get('/getID', 'App\Http\Controllers\Api\FuelOTWorkerController@getByIdWorker');
    Route::get('/getAllFuel', 'App\Http\Controllers\Api\FuelOTWorkerController@getAllFOWorker');
    Route::post('', 'App\Http\Controllers\Api\FuelOTWorkerController@insertFuelOTWorker');
    Route::post('/update', 'App\Http\Controllers\Api\FuelOTWorkerController@updateFuelOT');
    Route::post('/adcheck', 'App\Http\Controllers\Api\FuelOTWorkerController@checkFuelOTByAdmin');
});
// --------------------------------------------------------------------------//
// Application
Route::prefix('app')->group(function () {
    // Worker
    Route::prefix('worker')->group(function () {

        // fcm
        Route::post('send-fcm', 'App\Http\Controllers\Api\Mobile\WorkersController@sentNewWorkToWorker');
        // user
        Route::post('login', 'App\Http\Controllers\AccountionWorkerController@login');
        Route::post('avatar', 'App\Http\Controllers\Api\Mobile\WorkersController@addAvatar');
        Route::post('changePassword', 'App\Http\Controllers\Api\Mobile\WorkersController@changePasswordWorker');

        //work
        Route::post('getAllWorks', 'App\Http\Controllers\Api\Mobile\WorkersController@getAllWorks');
        Route::post('deleteWork', 'App\Http\Controllers\Api\WorksAssignmentController@cancelWorkFromAssignment');
        Route::post('returnWork', 'App\Http\Controllers\Api\WorksAssignmentController@returnWorkFromAssignment');
        Route::post('quoteWork', 'App\Http\Controllers\Api\WorksAssignmentController@insertQuoteWork');
        Route::post('doneWork', 'App\Http\Controllers\Api\WorksAssignmentController@continueWorkAss');
        Route::post('sendWorkByWorker', 'App\Http\Controllers\Api\Web\WorksController@store');
        Route::post('sendWorkToCompanyByWorker', 'App\Http\Controllers\Api\Web\WorksController@store');
    });
    // Customer
    Route::prefix('customer')->group(function () {
        Route::post('getNameCodeWorker', 'App\Http\Controllers\Api\Mobile\WorkersController@getNameCodeWorker');
    });
});
