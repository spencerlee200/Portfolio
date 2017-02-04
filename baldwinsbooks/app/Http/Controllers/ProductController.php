<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Cart;
use App\Product;
use App\WishList;

class ProductController extends Controller
{
  public function index($type, $id)
  {
      $product = Product::find($id);
      $count = DB::table('carts')
        ->join('products', 'products.id', "=", "carts.item_id")
        ->select("carts.id","products.name", "products.price", "products.imgURL")
        ->where("carts.owner_id", Auth::id())
        ->get();
      $count = count($count);
      return view('product', ['product'=> $product, 'count'=>$count]);
  }
}
