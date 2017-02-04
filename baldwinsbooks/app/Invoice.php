<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{

	public function users() {
        return $this->belongsTo('App\User');
    }
}
