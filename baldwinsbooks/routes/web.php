<?php

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

Route::get('/', function () { return view('welcome'); });
Auth::routes();
Route::get('/home', 'HomeController@index');


Route::group(['middleware'=>'auth'], function() {
  Route::get('/{type}/{id}', 'ProductController@index');
  Route::get('/cart', 'CartController@index');
  Route::get('/cart/add/{id}', 'CartController@add');
  Route::get('/cart/destroy/{id}', 'CartController@destroy');
  Route::get('/wishlist', 'WishListController@index');
  Route::get('/wishlist/add/{id}', 'WishListController@add');
  Route::get('/wishlist/destroy/{id}', 'WishListController@destroy');
  Route::get('/orderhistory', 'OrderHistoryController@index');

  Route::get("/checkout",
  	[
  	"uses" =>"CartController@getCheckout",
  	"as" => "checkout"
  	]);

  Route::post("/checkout",
  	[
  	"uses" =>"CartController@postCheckout",
  	"as" => "checkout"
  	]);
});
