<?php

use Illuminate\Support\Facades\Route;

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
    
    
    Route::prefix('f-api')->middleware(['front'])->group(function () {
        Route::get('/meta-data', 'Front\Pages\FrontControllers@index');
        Route::post('/process-video', 'Videos\VideoControllers@process');
        Route::post('/user-tweet-videos', 'Videos\TweetVideoControllers@index');
    });
