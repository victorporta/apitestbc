<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'auth:api'], function () {
    Route::get('/test',[App\Http\Controllers\GenerateImageController::class, 'index']);
    Route::post('/image',[App\Http\Controllers\GenerateImageController::class, 'image']);

});
//Route::get('/todo',[App\Http\Controllers\TodoController::class, 'index']);
Route::get('/user/{id}/todo',[App\Http\Controllers\TodoController::class, 'index']);

Route::delete('/todo/{id}',[App\Http\Controllers\TodoController::class, 'delete']);
Route::put('/todo/{id}',[App\Http\Controllers\TodoController::class, 'edit']);
Route::get('/users',[App\Http\Controllers\UserController::class, 'getUsers']);

Route::post('/user/{id}/todo',[App\Http\Controllers\TodoController::class, 'add']);


Route::post('register', [App\Http\Controllers\UserController::class, 'registerUser']);

Route::post('login', [App\Http\Controllers\UserController::class, 'userLogin']);
