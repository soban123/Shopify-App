<?php


namespace App\Http\Controllers;


class BillingController {

    public function index()
    {
        // Description and price of usage charge (the only two parameters required)
        $charge = [
            'description' => 'Five e-mails',
            'price'       => 1.00,
            'redirect'    => route('example.success') // Optional, if not supplied redirect goes back to previous page with flash `success`=`true`
        ];

        // Create a signature to prevent tampering
        $signature = createHmac(['data' => $charge, 'buildQuery' => true], Config::get('shopify-app.api_secret'));

        // Create the route
        $usageChargeRoute = route('billing.usage_charge', array_merge($charge, ['signature' => $signature]));

        return view('example.index', compact('usageChargeRoute'));
    }

}
