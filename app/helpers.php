<?php

use App\ProductImage;
use App\UserSettings;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

function deleteImage($shop, $product_id, $image_id)
{
    $result = $shop->api()->rest('DELETE', '/admin/api/products/' . $product_id . '/images/' . $image_id . '.json');
    removeImage($image_id);
    return $result;
}

function postImage($shop, $product_id, $product, $path, $src_type, $watermark_data)
{
    $alt = $product['modified_alt_text'];
    $filename = $product['modified_filename'];
    if (!empty($src_type)) {
        $filename = $product['filename'];
        $alt = $product['alt'];
    }
    $data = array(
        'image' =>
            array(
                'id' => $product['image_id'],
                'alt' => $alt,
                'src' => $path,
                'filename' => $filename,
                'position' => $product['position']
            ),
    );
    $result = $shop->api()->rest('POST', '/admin/api/products/' . $product_id . '/images.json', $data);
    storeImage($result->body->image, $src_type, $watermark_data);
    return $result->body;

}

function removeImage($image_id)
{
    ProductImage::where('image_id', $image_id)->delete();
}

function storeImage($image, $src_type, $src_data)
{
    $image = (object)$image;
    $image_data = (object)[];
    $image_data = collect($image)->except('variant_ids', 'admin_graphql_api_id', 'id')->all();
    $image_data['shop_id'] = auth()->user()->id;
    $image_data['image_id'] = $image->id;
    $image_path = $image->src;
    $filename = basename(substr($image_path, 0, strpos($image_path, '?')));
    $img = Image::make($image_path)->save(public_path('images/' . $filename));
    $image_data['local_src'] = asset('images/' . $filename);
    $c_image = Image::make(public_path('/images/' . $filename))->save(public_path('/images/compressed/' . $filename));
    $factory = new \ImageOptimizer\OptimizerFactory();
    $optimizer = $factory->get();
    $optimizer->optimize(public_path('/images/compressed/' . $filename));
    $image_data['local_src_compressed'] = asset('images/compressed/' . $filename);
    $image_data['original_size'] = $img->filesize();
    $image_data['compressed_size'] = $c_image->filesize();
    ProductImage::updateOrCreate(['image_id' => $image_data['image_id']], $image_data);
    if ($src_type == 'watermark') {
        ProductImage::where('image_id', $image_data['image_id'])->update(['watermark_src' => $src_data]);
    }
    if ($src_type == 'resize') {
        ProductImage::where('image_id', $image_data['image_id'])->update(['resized_src' => $src_data]);
    }
}

function saveProductImage($image, $src_type, $src_data,$used_by_user)
{
    $user_settings = UserSettings::whereUserId(auth()->user()->id)->first();
    $image = (object)$image;
    $image_data = (object)[];
    $image_data = collect($image)->except('variant_ids', 'admin_graphql_api_id', 'id')->all();
    $image_data['shop_id'] = auth()->user()->id;
    $image_data['image_id'] = $image->id;
    $image_path = $image->src;
    $filename = basename(substr($image_path, 0, strpos($image_path, '?')));
    $img = Image::make($image_path)->save(public_path('images/' . $filename));
    $image_data['local_src'] = asset('images/' . $filename);
//    Creating for the First Time
    $p = ProductImage::updateOrCreate(['image_id' => $image_data['image_id']], $image_data);
//
    $image_id = $p->id;
    $product = \App\Product::whereId($p->product_id)->first();
//    BULK SETTINGS
    $settingfilename = $user_settings->file_name;
    $toReplace = ['[product_title]', '[product_type]', '[product_vendor]'];
    $replaceWith = [$product->handle, $product->type, $product->vendor];
    $newFileName = str_replace($toReplace, $replaceWith, $settingfilename);
    $newFileName = strtolower(Str::slug($newFileName, '-'));
    $detailsFromFileName = explode(".", $filename);
    $extension = '.' . $detailsFromFileName[1];
    $image_data['modified_filename'] = $newFileName;
    $newFileName .= '_' . $image_id;

    $settingalttext = $user_settings->alt_name;
    $newAltText = str_replace($toReplace, $replaceWith, $settingalttext);
    $image_data['modified_alt'] = $newAltText;

    $compressed_path = public_path('/images/compressed/' . $newFileName . $extension);
    $factory = new \ImageOptimizer\OptimizerFactory();
    $optimizer = $factory->get();
    Image::make(public_path('/images/' . $filename))->save($compressed_path);
    if ($user_settings->to_jpeg) {
        Image::make(public_path('/images/' . $filename))->encode('png', 90)->save(public_path('/converted_format/' . $newFileName . '.png'));
        $image_data['converted_format_src'] = asset('/converted_format/' . $newFileName . '.png');
    }
    if ($user_settings->compression_type == 'lossy') {
        $optimizer->optimize(public_path('/images/compressed/' . $newFileName.$extension));
        convert(public_path('/images/compressed/' . $newFileName.$extension), public_path('/images/compressed/' . $newFileName.$extension));
    } else {
        $optimizer->optimize(public_path('/images/compressed/' . $newFileName.$extension));
    }
    $image_data['local_src_compressed'] = asset('images/compressed/' . $newFileName.$extension);
    $c_image = Image::make(public_path('/images/compressed/' . $newFileName.$extension));
    $image_data['original_size'] = $img->filesize();
    $image_data['compressed_size'] = $c_image->filesize();
    $image_data['used_by_user']=0;
//    $statement = DB::select("show table status like 'product_images'");
//    dd(['user_id' => $statement[0]->Auto_increment]);
    if ($used_by_user)
        $image_data['used_by_user'] = 1;
    ProductImage::updateOrCreate(['image_id' => $image_data['image_id']], $image_data);
    if ($src_type == 'watermark') {
        ProductImage::where('image_id', $image_data['image_id'])->update(['watermark_src' => $src_data]);
    }
    if ($src_type == 'resize') {
        ProductImage::where('image_id', $image_data['image_id'])->update(['resized_src' => $src_data]);
    }

}

function convert($from, $to)
{
    $command = 'convert '
        . $from
        . ' '
        . '-sampling-factor 4:2:0 -strip -quality 40'
        . ' '
        . $to;
    return `$command`;
}
