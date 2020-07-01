<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductImage;
use App\ProductVariant;
use App\UserSettings;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    //
    public function get_products_from_api()
    {
        $shop = auth()->user();
        $images = [];
        $variants = [];
        $records_inserted = [];
//        $getResultsFromDB = false;
        $count = $shop->api()->rest('GET', '/admin/api/products/count.json');
//        ProductImage::where('shop_id', auth()->user()->id)->get()->unique('product_id')->count()
//        if ($count->body->count == Product::all()->count()) {
//            $p = ProductImage::where('shop_id', auth()->user()->id)->get()->groupBy('product_id')->toArray();
//            $v = ProductVariant::where('shop_id', auth()->user()->id)->get()->groupBy('product_id')->toArray();
//            $variants = array_values($v);
//            $images = array_values($p);
//            $getResultsFromDB = true;
//            echo "Fetching From DB<br>";
//        } else {
        $user_settings=UserSettings::whereUserId(auth()->user()->id);
        $request = $shop->api()->rest('GET', '/admin/api/products.json');
        $products = $request->body->products;
        // dd($products);
        foreach ($products as $prod) {
            $missingImage = 0;
            if (count($prod->images) <= 0)
                $missingImage = 1;
            $request = $shop->api()->rest('GET', '/admin/products/' . $prod->id . '/images.json');
            array_push($images, $request->body->images);
            $r_variants = $shop->api()->rest('GET', '/admin/api/products/' . $prod->id . '/variants.json');
            array_push($variants, $r_variants->body->variants);
            $prod = (object)$prod;
            $product_data = [];
            $product_data = collect($prod)->except('images', 'image', 'admin_graphql_api_id', 'variants', 'options')->all();
            $product_data['shop_id'] = auth()->user()->id;
            $product_data['updated_by_user'] = 0;
            $product_data['broken_image'] = $missingImage;
            Product::updateOrCreate(["id" => $product_data['id']], $product_data);
            array_push($records_inserted, $product_data['id']);
        }
        $existing_records = Product::pluck('id')->toArray();
        $redundant_entries = array_diff($existing_records, $records_inserted);
        Product::whereIn('id', $redundant_entries)->delete();
        $variants_inserted = [];
        for ($x = 0; $x < count($variants); $x++) {
            foreach ($variants[$x] as $variant) {
                $variant = (object)$variant;
                $variant_data = (object)[];
                $variant_data = collect($variant)->except('admin_graphql_api_id', 'id')->all();
                $variant_data['shop_id'] = auth()->user()->id;
                $variant_data['variant_id'] = $variant->id;
                ProductVariant::updateOrCreate(['variant_id' => $variant_data['variant_id']], $variant_data);
                array_push($variants_inserted, $variant_data['variant_id']);
            }
        }
        $existing_variants = ProductVariant::pluck('variant_id')->toArray();
        $redundant_variants = array_diff($existing_variants, $variants_inserted);
        ProductVariant::whereIn('variant_id', $redundant_variants)->delete();
//        }
        $images_inserted = [];
        echo "Total Products:" . $count->body->count;
        for ($i = 0; $i < count($images); $i++) {
            foreach ($images[$i] as $image) {
                saveProductImage($image, false, [], false);
                array_push($images_inserted, $image->id);
            }
        }
        $existing_images = ProductImage::pluck('image_id')->toArray();
        $redundant_images = array_diff($existing_images, $images_inserted);
        ProductImage::whereIn('image_id', $redundant_images)->delete();
    }

    public function save_user_settings()
    {
//        $data=request()->all();
//        return compact('data');
        $user_id=auth()->user()->id;
        $store_type = \request('productType');
        $file_name = \request('fileName');
        $tag = \request('tagName');
        $compression_type = \request('compression_type');
        $to_jpeg = \request('to_jpg');
        $show_watermark = \request('iswatermark');
        $edit_previous = \request('edit_previous');
        UserSettings::updateOrCreate(['user_id'=>$user_id],[
            'user_id' => $user_id,
            'store_type' => $store_type,
            'file_name' => $file_name,
            'alt_name' => $tag,
            'compression_type' => $compression_type,
            'to_jpeg' => $to_jpeg,
            'show_watermark' => $show_watermark,
            'edit_previous' => $edit_previous
        ]);
    }

    public function dashboard()
    {
        $user_id = auth()->user()->id;
    }

    public function imageUpload(Request $request){
        $file = $request['file'];
        $name = $request['name'];
       
       $path =  $request['file']->move(public_path('images'), $name);
        return $path;
    }

    public function get_dashboard_statistics()
    {
        return ['products' => ProductImage::where('shop_id', 1)->get()];
    }
}
