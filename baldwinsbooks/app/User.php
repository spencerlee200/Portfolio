<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'admin',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    public function invoices() {
      return $this->hasMany('App\Invoice');
    }

    public function carts() {
      return $this->belongsTo('App\Cart');
    }

    public function wishlist() {
      return $this->belongsTo('App\WishList');
    }

    public function orders() {
      return $this->hasMany('App\OrderHistory');
    }
}
