<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Auth;
use App\OrderHistory;
use App\Cart;
use App\Product;
use Stripe\Charge;
use Stripe\Stripe;

class CartController extends Controller
{
  public function index()
  {
    $products = DB::table('carts')
      ->join('products', 'products.id', "=", "carts.item_id")
      ->select("carts.id","products.id","products.name", "products.description", "products.price", "products.productType","products.imgURL")
      ->where("carts.owner_id", Auth::id())
      ->get();
    $count = count($products);
    $total = 0;
    foreach($products as $prod)
    {
      $total += $prod->price;
    }

    return view('cart', ['products'=>$products, 'total'=>$total, 'count'=>$count, 'success'=>""]);
  }

  public function add(Request $request)
  {
    if (!Cart::where('item_id', $request->id)->where('owner_id', Auth::id())->first()) {
      $entry = new Cart;
      $entry->owner_id = Auth::id();
      $entry->item_id = $request->id;
      $entry->save();
      //notify user if already in cart
    }
    return redirect()->back();
  }

  public function destroy($id)
  {
    $cart = Cart::all()->where('item_id', $id)->where('owner_id', Auth::id())->first();

    $cart->delete();
    return redirect('/cart');
  }

  public function getCheckout()
  {

    $products = DB::table('carts')
      ->join('products', 'products.id', "=", "carts.item_id")
      ->select("carts.id","products.id","products.name", "products.description", "products.price", "products.productType","products.imgURL")
      ->where("carts.owner_id", Auth::id())
      ->get();
    $total = 0;
    $count = count($products);
    foreach($products as $prod)
    {
      $total += $prod->price;
    }

    if($total != 0)
    {
      return view('checkout',["products"=>$products,'total'=> $total,"count"=>$count,'success'=>""]);
    }
    else
    {
      return redirect("/cart");
    }

  }
  public function postCheckout(Request $request)
  {

    $products = DB::table('carts')
      ->join('products', 'products.id', "=", "carts.item_id")
      ->select("carts.id","products.id","products.name", "products.description", "products.price", "products.productType","products.imgURL")
      ->where("carts.owner_id", Auth::id())
      ->get();
    $total = 0;
    $count = count($products);
    foreach($products as $prod)
    {
      $total += $prod->price;
    }
      if($count == 0 )
      {
        return redirect("/cart");
      }
      else
      {
        Stripe::setApiKey('sk_test_wPwsgXgRg8TLHied0JjwJ4KC');
        try
        {
          Charge::create(array(
            "amount" => $total * 100,
            "currency" => "usd",
            "source" => $request->input("stripeToken"),
            "description" => "Test charge"
              //Add in description to be displayed!
            ));
        }
        catch (\Exception $e)
        {
          return redirect()->route("checkout")->with("error", $e->getMessage());
        }

        //Create the order history entry
        foreach($products as $prod)
        {
          $num = Date('U') . Auth::id();


          OrderHistory::create([
            'orderNumber' => (int)$num,
            'owner_id' => Auth::id(),
            'item_id' => $prod->id,
          ]);
        }


        //Do database remove of the cart objects
        foreach($products as $prod)
        {
          $item = Cart::all()->where('item_id', $prod->id)->where('owner_id', Auth::id())->first();
          $item->delete();
        }
        $products = [];
        $total = 0;
        $count = 0;

        //Do better success message

        return view('cart',["products"=>$products,'total'=> $total,"count"=>$count, "success"=>"Successfully made a purchase. Enjoy!"]);
      }
  }

}
