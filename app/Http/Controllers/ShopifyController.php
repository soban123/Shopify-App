<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Osiset\ShopifyApp\Services\ChargeHelper;

use Log;

class ShopifyController extends Controller
{
    public function index() {
        $shop = Auth::user();
        $domain = $shop->getDomain()->toNative();
        $chargeHelper = app()->make(ChargeHelper::class);
        $charge = $chargeHelper->chargeForPlan($shop->plan->getId(), $shop);
        $chargeApi = $chargeHelper->useCharge($charge->getReference())->retrieve();

        info("Domain: ".$domain);
        info('This is the Shop Object: '.json_encode($shop));
        $request = $shop->api()->rest('GET', '/admin/shop.json');
        info('return shop.json: '.json_encode($request));
        echo $request->body->shop->name;
        return;

    }
}
