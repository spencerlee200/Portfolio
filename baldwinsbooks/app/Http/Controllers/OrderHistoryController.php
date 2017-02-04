<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Cart;
use App\Product;

class OrderHistoryController extends Controller
{
  public function index()
  {
    $count = DB::table('carts')
      ->join('products', 'products.id', "=", "carts.item_id")
      ->select("carts.id","products.name", "products.price", "products.imgURL")
      ->where("carts.owner_id", Auth::id())
      ->get();
    $count = count($count);

    $orders = DB::table('order_histories')
      ->join('products', 'products.id', "=", "order_histories.item_id")
      ->select("order_histories.id","order_histories.orderNumber","products.name", "products.price")
      ->where("order_histories.owner_id", Auth::id())
      ->get();
    return view('orderhistory',['count'=>$count, 'orders'=>$orders]);
  }
}
