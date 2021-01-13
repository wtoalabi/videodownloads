<?php
    /**
     * Created by Alabi Olawale
     * Date: 13/01/2021
     */
    namespace App\Http\Controllers\Videos\Stats;
    use Illuminate\Support\Facades\Redis;
    
    class AccessedVideoDetails{
        public static function Run($data, $service) {
            $url = $data->webpage_url;
            $now = now()->timestamp;
            $title = $data->title;
            $data = json_encode([
                'url' => $url,
                'title' => $title,
            ]);
            Redis::HSET("VideoDownloads:Details:$service", $now, $data);
        }
    }
