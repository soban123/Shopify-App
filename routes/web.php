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

Route::get('/', function () {
    return view('welcome');
})->middleware(['auth.shopify'])->name('home');
Route::get('shopify', 'ShopifyController@index')->middleware(['auth.shopify']);
Route::get('/settings', 'BillingController@index')
    ->middleware(['auth.shopify', 'billable'])
    ->name('settings');
Route::get('js', function () {
    return "alert('yes');";
});

//New Route 1
Route::get('get_products_from_api','HomeController@get_products_from_api')->name('optimize');
Route::post('save_user_settings', 'HomeController@save_user_settings')->name('save_user_settings');
Route::get('/get_dashboard_statistics','HomeController@get_dashboard_statistics');

//Older Route 1
//Route::get('optimize_image', 'ProductController@get_products')->name('optimize');

Route::get('get_columns', 'ProductController@get_all_images')->name('get_columns');

Route::get('products_list', 'ProductController@products_list')->name('products_list');
Route::get('broken_images', 'ProductController@broken_images')->name('broken_images');
Route::get('get_broken_images', 'ProductController@get_broken_images')->name('get_broken_images');
Route::post('update_images', 'ProductController@update_products')->name('update_products');

Route::get('add_watermark', 'ProductController@watermark_page')->name('watermark_page');
Route::post('add_watermark', 'ProductController@add_watermark')->name('add_watermark');

Route::get('resize_image', 'ProductController@resize_image_page')->name('resize_image');
Route::post('resize_image', 'ProductController@resize_image');




Route::get('app', function () {
    return view('app');
});

//Route::get('get_products','HomeController@get_products');
