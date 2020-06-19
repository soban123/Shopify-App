<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductVariantsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('variant_id')->unique();
            $table->bigInteger('product_id');
            $table->bigInteger('image_id')->nullable();
            $table->bigInteger('inventory_item_id')->nullable();
            $table->text('title')->nullable();
            $table->double('price',10,2);
            $table->text('sku')->nullable();
            $table->integer('position');
            $table->string('inventory_policy')->nullable();
            $table->double('compare_at_price',10,2)->nullable();
            $table->string('fulfillment_service')->nullable();
            $table->string('inventory_management')->nullable();
            $table->string('option1')->nullable();
            $table->string('option2')->nullable();
            $table->string('option3')->nullable();
            $table->string('barcode')->nullable();
            $table->boolean('taxable');
            $table->bigInteger('grams');
            $table->double('weight',10,2)->nullable();
            $table->string('weight_unit');
            $table->integer('inventory_quantity');
            $table->integer('old_inventory_quantity');
            $table->boolean('requires_shipping');
            $table->bigInteger('shop_id');
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
        Schema::dropIfExists('product_variants');
    }
}
