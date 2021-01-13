<?php

namespace App\Http\Controllers\Videos;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Videos\Services\Youtube;
use App\Http\Controllers\Videos\Stats\Stats;

class VideoControllers extends Controller{
    public function process() {
        //dd(Redis::HGETALL("VideoDownloads:ServiceAccessCount"));
        $url = request('url');
        $service = request('service');
        $serviceInstance = SupportedServices($service);
        $data = $serviceInstance->process($url);
        Stats::Persist(json_decode($data));
        return response(['data' => $data, 'message' => "Done"], 200);
        
        //return view("front.html.front");
    }
    
}
function SupportedServices($service) {
    
    $lists =  [
        'youtube' => Youtube::class,
        'twitter' => Youtube::class,
    ];
    
    return new $lists[$service];
}
