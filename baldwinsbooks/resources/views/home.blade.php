@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading text-center">Products</div>

                <div class="panel-body">
                    @foreach($products as $product)
                      <div class="col-md-3" style="margin-bottom: 25px;">
                        <img style="width: 100%; height: 400px;" class='img-responsive' src='{{$product->imgURL}}'/>
                        <p class="text-center" style="padding-top: 5px; font-size: 1.2em;"> {{$product->name}}</p>
                        <p style="overflow: hidden; height: 70px; margin: 0;"> {{$product->description}}</p>
                        <p style="margin: 0;"> <a href='/{{$product->productType}}/{{$product->id}}'> Read More -> </a> </p>
                        <h4 class="pull-left"> ${{ $product->price }} </h4>
                        <a href="/cart/add/{{ $product->id }}" class="btn btn-warning pull-right" style="background: #f08804; border:none;"> Add to Cart</a><br />
                        <a href="/wishlist/add/{{ $product->id }}" class="btn btn-warning pull-right" style="background: #f08804; border:none; margin: 5px auto; margin-bottom: 15px; clear: both;"> Add to Wish List</a>
                      </div>
                    @endforeach
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
