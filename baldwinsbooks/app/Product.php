<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
	protected $fillable = [
		'name',
		'description',
		'productType',
		'price',
		'imgURL'
	];

	public function carts() {
		return $this->belongsTo('App\Cart');
	}
}
