<?php
    
    namespace App\Http\Controllers\Videos;
    
    use App\Exceptions\Videos\VideoProcessingException;
    use App\Http\Controllers\Controller;
    use App\Http\Controllers\Videos\Services\Youtube;
    use App\Http\Controllers\Videos\Stats\Stats;
    use App\Jobs\Stats\JobsToPersistStats;
    use Illuminate\Support\Facades\Log;
    use Illuminate\Support\Facades\Redis;
    use mysql_xdevapi\Exception;

    class VideoControllers extends Controller
    {
        public function process() {
            $url = request('url');
            $service = request('service');
            $serviceInstance = SupportedServices($service);
            try {
                $data = $serviceInstance->process($url);
                //$data = $this->useTestData();
                JobsToPersistStats::dispatch(json_decode($data))->onQueue('stats');
                return response(['data' => $data, 'message' => "Done"], 200);
            } catch (\Exception $e) {
                Log::error($e->getMessage(), $e->getTrace());
                throw new VideoProcessingException("AN ERROR HAS OCCURRED...AND ITS OUR FAULT. WE ARE FIXING IT. CHECK BACK LATER. THANKS!","500");
            }
            
            //return view("front.html.front");
        }
    
        private function useTestData() {
            $service = request('service');
            $data = json_decode(Redis::HGET("TestingVideoData", $service));
            return $data;
            //$url = request('url');
            //$data = $serviceInstance->process($url);
            //Redis::Hset("TestingVideoData", $service, json_encode($data));
        }
    
    }
    
    function SupportedServices($service) {
        
        $lists = [
            'youtube' => Youtube::class,
            'twitter' => Youtube::class,
        ];
        
        return new $lists[$service];
    }
