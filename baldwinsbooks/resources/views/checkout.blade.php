@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row">
    <div class="col-md-6 col-md-offset-3 ">
      <div class="panel panel-default">
        <div class="panel-heading text-center">Your Total: $ {{$total}}</div>
      	<form action="{{route('checkout')}}" method="POST" id="payment-form" class='text-center'>
      	  <span class="payment-errors"></span>

      	  <div class="form-group" style="margin-top: 15px;">
      	    <label for="number"> Card Number:
      	      <input type="text" size="30" name="number" data-stripe="number" class="form-control">
      	    </label>
      	  </div>

      	  <div class="form-group">
      	    <label>
      	      <span>Expiration (MM/YY): </span>
      	      <input type="text" size="5" data-stripe="exp_month">
      	    </label>
      	    <span> / </span>
      	    <input type="text" size="5" data-stripe="exp_year">
            <label style="margin-left: 1%;">
              <span>CVC:</span>
              <input type="text" size="4" data-stripe="cvc">
            </label>
      	  </div>

      	  <div class="form-group">
      	  </div>
      	  {{ csrf_field() }}

      	  <button type="submit" value="Submit Payment" class="btn btn-success" style="margin-bottom: 15px;"> Purchase</button>

      	</form>
      </div>
    </div>
  </div>
</div>

{{--  --}}
<script type="text/javascript" src="https://js.stripe.com/v2/"></script>
<script
  src="https://code.jquery.com/jquery-3.1.1.slim.min.js"
  integrity="sha256-/SIrNqv8h6QGKDuNoLGA4iret+kyesCkHGzVUUV0shc="
  crossorigin="anonymous"></script>
<script type="text/javascript">

	Stripe.setPublishableKey('pk_test_kTExD8cv7Ta1HscXkGwrsAr6');

	$(function()
	{
	  	var $form = $('#payment-form');
	  	$form.submit(function(event)
	  	{
		    // Disable the submit button to prevent repeated clicks:
		    $form.find('.submit').prop('disabled', true);

		    // Request a token from Stripe:
		    Stripe.card.createToken($form, stripeResponseHandler);

		    // Prevent the form from being submitted:
		    return false;
	 	 });
	});

function stripeResponseHandler(status, response)
{
  // Grab the form:
  var $form = $('#payment-form');

  if (response.error) { // Problem!

    // Show the errors on the form:
    $form.find('.payment-errors').text(response.error.message);
    $form.find('.submit').prop('disabled', false); // Re-enable submission

  	} else { // Token was created!

    // Get the token ID:
    var token = response.id;

    // Insert the token ID into the form so it gets submitted to the server:
    $form.append($('<input type="hidden" name="stripeToken">').val(token));

    // Submit the form:
    $form.get(0).submit();
  }
};


</script>
@endsection
