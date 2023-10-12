<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });
// Route::middleware('auth')->group




Route::middleware('auth')->group(function () {
    // Route::get('/welcome', function () {return Inertia::render('Welcome');})->name('welcome');
    Route::get('/', function () {return Inertia::render('Dashboard');})->name('dashboard');
    Route::get('/chat', function () {return Inertia::render('chat/Chat');})->name('chat');
    Route::get('/tim-kiem', function () {return Inertia::render('Search');})->name('search');
    Route::get('/thong-bao-lich-moi', function () {return Inertia::render('Notice');})->name('notice');
    Route::get('/lich-huy', function () {return Inertia::render('CancelBooking');})->name('CancelBooking');
    Route::get('/test', function () {return Inertia::render('test');})->name('test');

    Route::prefix('admin')->group(function(){
        Route::get('/',function(){return Inertia::render('Admin/Home/Home');})->name('admin');
        // Worker
        Route::get('/worker-list ',function(){return Inertia::render('Admin/Worker/WorkerList');})->name('admin/worker-list');
        Route::get('/worker-account ',function(){return Inertia::render('Admin/Worker/WorkerAccount');})->name('admin/worker-account');
        Route::get('/worker-check-call',function(){return Inertia::render('Admin/Worker/WorkerCheckCall');})->name('admin/worker-check-call');
        // Data
        Route::get('/data-import-customer',function(){return Inertia::render('Admin/DataImport/DataCustomerImport');})->name('admin/data-import-customer');
        Route::get('/data-import-worker',function(){return Inertia::render('Admin/DataImport/DataWorkerImport');})->name('admin/data-import-worker');
        Route::get('/data-import-price',function(){return Inertia::render('Admin/DataImport/DataPriceImport');})->name('admin/data-import-price');
        // Application
        Route::get('/application-popup',function(){return Inertia::render('Admin/Application/ApplicationPopupDiscount');})->name('admin/application-popup');
        // Zalo
        Route::get('/zalo-zns-thanks',function(){return Inertia::render('Admin/Zalo/ZaloSendZNSThanks');})->name('admin/zalo-zns-thanks');
        Route::get('/zalo-zns-quotes',function(){return Inertia::render('Admin/Zalo/ZaloSendZNSQuotes');})->name('admin/zalo-zns-quotes');
    });
    Route::prefix('workers')->group(function(){
        Route::get('/',function(){return Inertia::render('Worker/Worker-main');})->name('WorkerMain');
        Route::get('/vi-tri-tho', function () {return Inertia::render('Worker/MapWorker');})->name('locationWorker');
    });
    Route::get('/distrist', function () {return Inertia::render('Distrist');})->name('distrist');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
