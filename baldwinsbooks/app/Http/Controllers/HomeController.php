<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\Cart;
use App\Product;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $products = Product::all();
        $count = DB::table('carts')
          ->join('products', 'products.id', "=", "carts.item_id")
          ->select("carts.id","products.name", "products.price", "products.imgURL")
          ->where("carts.owner_id", Auth::id())
          ->get();
        $count = count($count);
        return view('home', ['products'=>$products, 'count'=>$count]);
    }
}
