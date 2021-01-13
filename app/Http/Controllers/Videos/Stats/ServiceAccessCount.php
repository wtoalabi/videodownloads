<?php
    /**
     * Created by Alabi Olawale
     * Date: 13/01/2021
     */
    namespace App\Http\Controllers\Videos\Stats;
    
    use Illuminate\Support\Facades\Redis;

    class ServiceAccessCount{
        public static function Run($service) {
            Redis::HINCRBY("VideoDownloads:ServiceAccessCount", $service, 1);
        }
    }
