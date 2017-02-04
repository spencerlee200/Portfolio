<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
  public function users() {
      return $this->hasMany('App\User');
  }

  public function products() {
      return $this->hasMany('App\Product');
  }
}
