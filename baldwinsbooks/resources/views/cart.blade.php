@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-12">
            <div class="panel panel-default">
                @if($success)
                  <p class="alert alert-success">{{$success}}</p>
                @endif
                <div class="panel-heading text-center">Your Cart</div>
                <div class="panel-body">
                  @foreach($products as $product)
                    <div class="col-md-3">

                      <img style="width: 100%; height: 335px;" src='{{$product->imgURL}}'/>
                      <p class="text-center" style="padding-top: 5px; font-size: 1.2em;"> {{$product->name}}</p>
                      <p style="overflow: hidden; height: 70px; margin: 0;"> {{$product->description}}</p>
                      <p style="margin: 0;"> <a href='/{{$product->productType}}/{{$product->id}}'> Read More -> </a> </p>
                      <h4 class="pull-left"> ${{ $product->price }} </h4>
                      <a href="/cart/destroy/{{ $product->id }}" class="btn btn-danger pull-right"> Remove</a>
                    </div>
                  @endforeach
                </div>

                <div class="panel-footer text-right">
                  <span style="margin-top: 40px; margin-right: 15px;">Total: $ {{$total}}</span>
                  <a href="{{route('checkout')}}" class="btn btn-success"> Check Out</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
