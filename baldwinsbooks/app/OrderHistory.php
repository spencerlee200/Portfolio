<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrderHistory extends Model
{
    protected $fillable = [
      'orderNumber', 'owner_id', 'item_id',
    ];

    public function users() {
      return $this->belongsTo('App\User');
    }
}
