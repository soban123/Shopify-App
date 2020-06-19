<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    //
    protected $table = 'products';

    protected $guarded = [];

    protected $with=['product_variants'];

    public function product_images()
    {
        return $this->hasMany(ProductImage::class, 'product_id');
    }

    public function product_variants()
    {
        return $this->hasMany(ProductVariant::class, 'product_id', 'id');
    }

//    public function product_images()
//    {
//        return $this->hasMany(ProductImage::class, 'product_id');
//    }
//
//    public function product_variants()
//    {
//        return $this->hasMany(ProductVariant::class, 'product_id');
//    }

    public function getTableColumns()
    {
        return $this->getConnection()->getSchemaBuilder()->getColumnListing($this->getTable());
    }

}
