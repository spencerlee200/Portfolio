<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\WishList;
use App\Product;

class WishListController extends Controller
{
  public function index()
  {
    $wish_list = DB::table('wish_lists')
      ->join('products', 'products.id', "=", "wish_lists.item_id")
      ->select("wish_lists.id","products.id","products.name", "products.description", "products.price", "products.productType","products.imgURL")
      ->where("wish_lists.owner_id", Auth::id())
      ->get();

      $products = DB::table('carts')
        ->join('products', 'products.id', "=", "carts.item_id")
        ->select("carts.id","products.id","products.name", "products.description", "products.price", "products.productType","products.imgURL")
        ->where("carts.owner_id", Auth::id())
        ->get();
      $count = count($products);

    return view('wishlist', ['products'=>$wish_list, 'count'=>$count]);
  }

  public function add(Request $request)
  {
    if (!WishList::where('item_id', $request->id)->where('owner_id', Auth::id())->first()) {
      $entry = new WishList;
      $entry->owner_id = Auth::id();
      $entry->item_id = $request->id;
      $entry->save();
      //notify user if already in cart
    }
    return redirect()->back();
  }

  public function destroy($id)
  {
    $entry = WishList::all()->where('item_id', $id)->where('owner_id', Auth::id())->first();

    $entry->delete();
    return redirect('/wishlist');
  }
}
