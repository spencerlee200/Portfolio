@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                <div class="panel-heading text-center">Product</div>

                <div class="panel-body">
                  <div class="pull-left" style="width: 40%;">
                    <img class="center-block img-responsive" src='{{ $product->imgURL }}'/>
                  </div>

                  <div class="pull-right" style="width: 60%;">
                    <h2> {{ $product->name }} </h2>
                    <p class="col-md-11"> {{$product->description }} </p>
                    <div style="clear: both; margin-left: 12px;">
                      <p> Written by: {{ $product->author }} </p>
                      <p> Product Type: {{ $product->productType }} </p>
                      <p style="font-size: 1.5em;"> ${{$product->price }} </p>
                      <a href="/cart/add/{{ $product->id }}" class="btn btn-warning align-right" style="background: #f08804; border:none; margin-right: 80px; margin-bottom: 10px;"> Add to Cart</a><br />
                      <a href="/wishlist/add/{{ $product->id }}" class="btn btn-warning align-right" style="background: #f08804; border:none; margin-right: 5px;"> Add to Wish List</a>
                    </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
