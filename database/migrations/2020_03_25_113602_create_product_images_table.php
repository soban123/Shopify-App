<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductImagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_images', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('product_id');
            $table->bigInteger('image_id')->unique();
            $table->integer('position')->nullable();
            $table->text('alt')->nullable();
            $table->integer('height')->nullable();
            $table->integer('width')->nullable();
            $table->text('src')->nullable();
            $table->text('local_src')->nullable();
            $table->text('local_src_compressed');
            $table->text('resized_src')->nullable();
            $table->text('watermark_src')->nullable();
            $table->text('converted_format_src')->nullable();
            $table->bigInteger('original_size')->nullable();
            $table->bigInteger('compressed_size')->nullable();
            $table->smallInteger('used_by_user');
            $table->text('modified_filename')->nullable();
            $table->text('modified_alt')->nullable();
            $table->text('shop_id');
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
        Schema::dropIfExists('images');
    }
}
