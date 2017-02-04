<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateWishlistTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
      Schema::create('wish_lists', function (Blueprint $table) {
          $table->increments('id');
          $table->integer('owner_id')->unsigned();
          $table->foreign('owner_id')->references('id')->on('users');
          $table->integer('item_id')->unsigned();
          $table->foreign('item_id')->references('id')->on('products');
          $table->timestamps();
      });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('wishlist');
    }
}
