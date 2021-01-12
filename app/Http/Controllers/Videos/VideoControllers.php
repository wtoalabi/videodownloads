<?php

namespace App\Http\Controllers\Videos;

use App\Http\Controllers\Controller;
use App\Http\Controllers\Videos\Services\Youtube;
use Illuminate\Http\Request;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\ExecutableFinder;
use Symfony\Component\Process\Process;

class VideoControllers extends Controller{
    public function process() {
        $url = request('url');
        $service = request('service');
        $serviceInstance = SupportedServices($service);
        return $serviceInstance->process($url);
        
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
