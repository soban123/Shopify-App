<?php

namespace App\Http\Controllers;

use App\Product;
use App\ProductVariant;
use App\UserSettings;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;
use App\ProductImage;
use ImageOptimizer; 


class ProductController extends Controller
{
    //
    public function resize_image_page()
    {
        return view('products.resize_image');
    }

    public function watermark_page()
    {
        return view('products.add_watermark');
    }

    public function get_broken_images()
    {
        $products = Product::where('broken_image', 1)->get();
        return compact('products');
    }

    public function broken_images()
    {
        return view('products.broken_images');
    }

    public function products_list()
    {
        return view('products.update_images');
    }

    public function get_all_images()
    {
        $products = ProductImage::with(['product'])
//            ->where('shop_id', auth()->user()->id)
            ->get();
        $products = collect($products)->map(function ($product) {
            return collect($product)->merge(['equal_sized' => $product->height == $product->width, 'modified_filename' => '', 'modified_alt_text' => '', 'check' => false]);
        });
        return compact('products');
    }

    public function resize_image(Request $request)
    {
        $shop = auth()->user();
        $productToUpdate = \request('activeProduct');
        $parts = parse_url($productToUpdate['local_src']);
        $filename = basename($parts['path']);
        $img = Image::make(\request('newFile'))
            ->save(public_path('/images/resized_image/' . $filename));
        $productToUpdate['filename'] = $filename;
        $path_to_resized_image = asset('/images/resized_image/' . $filename);
        $deleted_image = deleteImage($shop, $productToUpdate['product_id'], $productToUpdate['image_id']);
        $inserted_image = postImage($shop, $productToUpdate['product_id'], $productToUpdate, $path_to_resized_image, 'resize', $path_to_resized_image);
        return compact('inserted_image');
    }

    public function add_watermark(Request $request)
    {
        $shop = auth()->user();
        $image_watermarks = [];
        $fileName = \request('fileName');
        $image = \request()->input('files');
        $productsToUpdate = \request('productsToUpdate');
        $name = $fileName . '.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
        $watermark = \Image::make($request->get('files'));
        foreach ($productsToUpdate as $product) {
            if ($product['check']) {
                $parts = parse_url($product['local_src']);
                $filename = basename($parts['path']);
                $product['filename'] = $filename;
                $img = Image::make(public_path('/images/' . $filename))
                    ->insert($watermark, \request('watermarklocation'), 30, 30)
                    ->save(public_path('images/watermarks/' . $filename));
                $path_to_watermark = asset('/images/watermarks/' . $filename);
                $deleted_image = deleteImage($shop, $product['product_id'], $product['image_id']);
                $posted_image = postImage($shop, $product['product_id'], $product, $path_to_watermark, 'watermark', $path_to_watermark);
                array_push($image_watermarks, $posted_image);
            }
        };
        $message = 'Updated Successfully';
        return compact('message', 'image_watermarks');
    }

    public function update_products(Request $request)
    {
        $product_compressed = [];
        $updated_image = [];
        $shop = auth()->user();
        $compression_rate = \request('compression_rate');
        $productsToUpdate = \request('productsToUpdate');
        foreach ($productsToUpdate as $product) {
            if ($product['check']) {
                ProductImage::where('image_id', $product['image_id'])
                    ->where('shop_id', auth()->user()->id)
                    ->update(['modified_filename' => $product['modified_filename'], 'modified_alt' => $product['modified_alt_text']]);
                $parts = parse_url($product['local_src']);
                $filename = basename($parts['path']);
                $compressed_path = public_path('/images/new_compressed/' . $filename);
                $move_image = Image::make(public_path('/images/' . $filename))->save($compressed_path);
                $factory = new \ImageOptimizer\OptimizerFactory();
                $optimizer = $factory->get();
                $optimizer->optimize(public_path('/images/new_compressed/' . $filename));
                $this->convert(public_path('/images/new_compressed/' . $filename), public_path('/images/new_compressed/' . $filename), $compression_rate);
                $new_image = Image::make($compressed_path);
                if ($new_image) {
                    $size = $new_image->filesize();
                }
                array_push($product_compressed, asset('/images/new_compressed/' . $filename));
                $deleted_image = deleteImage($shop, $product['product_id'], $product['image_id']);
                $posted_image = postImage($shop, $product['product_id'], $product, asset('/images/new_compressed/' . $filename), '', '');
                array_push($updated_image, $posted_image);
            }
        };
        $message = 'Updated Successfully';
        return compact('message', 'productsToUpdate', 'size', 'product_compressed');
    }

    public function convert($from, $to, $quality)
    {
        $command = 'convert '
            . $from
            . ' '
            . '-sampling-factor 4:2:0 -strip -quality ' . $quality
            . ' '
            . $to;
        return `$command`;
    }

//    public function get_products()
//    {
//        $shop = auth()->user();
//        $images = [];
//        $variants = [];
//        $records_inserted = [];
////        $getResultsFromDB = false;
//        $count = $shop->api()->rest('GET', '/admin/api/products/count.json');
////        ProductImage::where('shop_id', auth()->user()->id)->get()->unique('product_id')->count()
////        if ($count->body->count == Product::all()->count()) {
////            $p = ProductImage::where('shop_id', auth()->user()->id)->get()->groupBy('product_id')->toArray();
////            $v = ProductVariant::where('shop_id', auth()->user()->id)->get()->groupBy('product_id')->toArray();
////            $variants = array_values($v);
////            $images = array_values($p);
////            $getResultsFromDB = true;
////            echo "Fetching From DB<br>";
////        } else {
//        $user_settings=UserSettings::whereUserId(auth()->user()->id);
//        $request = $shop->api()->rest('GET', '/admin/api/products.json');
//        $products = $request->body->products;
//        foreach ($products as $prod) {
//            $missingImage = 0;
//            if (count($prod->images) <= 0)
//                $missingImage = 1;
//            $request = $shop->api()->rest('GET', '/admin/products/' . $prod->id . '/images.json');
//            array_push($images, $request->body->images);
//            $r_variants = $shop->api()->rest('GET', '/admin/api/products/' . $prod->id . '/variants.json');
//            array_push($variants, $r_variants->body->variants);
//            $prod = (object)$prod;
//            $product_data = [];
//            $product_data = collect($prod)->except('images', 'image', 'admin_graphql_api_id', 'variants', 'options')->all();
//            $product_data['shop_id'] = auth()->user()->id;
//            $product_data['updated_by_user'] = 0;
//            $product_data['broken_image'] = $missingImage;
//            Product::updateOrCreate(["id" => $product_data['id']], $product_data);
//            array_push($records_inserted, $product_data['id']);
//        }
//        $existing_records = Product::pluck('id')->toArray();
//        $redundant_entries = array_diff($existing_records, $records_inserted);
//        Product::whereIn('id', $redundant_entries)->delete();
//        $variants_inserted = [];
//        for ($x = 0; $x < count($variants); $x++) {
//            foreach ($variants[$x] as $variant) {
//                $variant = (object)$variant;
//                $variant_data = (object)[];
//                $variant_data = collect($variant)->except('admin_graphql_api_id', 'id')->all();
//                $variant_data['shop_id'] = auth()->user()->id;
//                $variant_data['variant_id'] = $variant->id;
//                ProductVariant::updateOrCreate(['variant_id' => $variant_data['variant_id']], $variant_data);
//                array_push($variants_inserted, $variant_data['variant_id']);
//            }
//        }
//        $existing_variants = ProductVariant::pluck('variant_id')->toArray();
//        $redundant_variants = array_diff($existing_variants, $variants_inserted);
//        ProductVariant::whereIn('variant_id', $redundant_variants)->delete();
////        }
//        $images_inserted = [];
//        echo "Total Products:" . $count->body->count;
//        for ($i = 0; $i < count($images); $i++) {
//            foreach ($images[$i] as $image) {
//                storeImage($image, false, []);
//                array_push($images_inserted, $image->id);
//            }
//        }
//        $existing_images = ProductImage::pluck('image_id')->toArray();
//        $redundant_images = array_diff($existing_images, $images_inserted);
//        ProductImage::whereIn('image_id', $redundant_images)->delete();
//    }
}
