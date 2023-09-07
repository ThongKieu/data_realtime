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
        Route::get('/',function(){return Inertia::render('Admin/HomeAdmin/HomeAdmin');})->name('admin');
        Route::get('/worker',function(){return Inertia::render('Admin/Worker/Worker');})->name('Worker');
    });
    Route::get('/distrist', function () {return Inertia::render('Distrist');})->name('distrist');
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
