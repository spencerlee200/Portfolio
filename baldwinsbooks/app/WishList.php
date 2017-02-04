<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class WishList extends Model
{
  public function users() {
      return $this->hasMany('App\User');
  }

  public function products() {
      return $this->hasMany('App\Product');
  }
}
