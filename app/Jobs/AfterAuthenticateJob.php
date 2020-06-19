<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Osiset\ShopifyApp\Contracts\ShopModel;


class AfterAuthenticateJob
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    protected $shop;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct(ShopModel $shop)
    {
        $this->shop = $shop;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        if ($this->shop->finished_setup) {
            // Setup has finished, this should've ran by now, kill it
            return;
        }


        if (!$this->shop->isGrandfathered()) {
            $planName = $this->shop->api()->rest('GET', '/admin/shop.json')->body->shop->plan_name;
            if ($planName === 'affiliate' || $planName === 'staff_business') {
                $this->shop->shopify_grandfathered = true;
                $this->shop->finished_setup = 1;
                $this->shop->save();
            }
        }
    }
}
