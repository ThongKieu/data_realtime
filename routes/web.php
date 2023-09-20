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
    Route::get('/welcome', function () {return Inertia::render('Welcome');})->name('welcome');
    Route::get('/', function () {return Inertia::render('Dashboard');})->name('dashboard');
    Route::get('/chat', function () {return Inertia::render('chat/Chat');})->name('chat');
    Route::get('/tim-kiem', function () {return Inertia::render('Search');})->name('search');
    Route::get('/thong-bao-lich-moi', function () {return Inertia::render('Notice');})->name('notice');

    Route::prefix('admin')->group(function(){
        Route::get('/',function(){return Inertia::render('Admin/Home/Home');})->name('admin');
        // Worker
        Route::get('/worker-list ',function(){return Inertia::render('Admin/Worker/WorkerList');})->name('admin/worker-list');
        Route::get('/worker-account ',function(){return Inertia::render('Admin/Worker/WorkerAccount');})->name('admin/worker-account');
        // Data
        Route::get('/data-customer-import ',function(){return Inertia::render('Admin/DataImport/DataCustomerImport');})->name('admin/data-customer-import');
        Route::get('/data-worker-import ',function(){return Inertia::render('Admin/DataImport/DataWorkerImport');})->name('admin/data-worker-import');
        Route::get('/data-price-import ',function(){return Inertia::render('Admin/DataImport/DataPriceImport');})->name('admin/data-price-import');
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
