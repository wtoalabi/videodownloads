<?php
    
    namespace App\Http\Controllers\Videos;
    
    use App\Http\Controllers\Controller;
    use Illuminate\Support\Facades\Redis;
    
    class TweetVideoControllers extends Controller
    {
        public function index() {
            $id = request("twitterID");
            $dataAll = collect(Redis::HGETALL("VideoDownloads:Twitter:Users:$id"));
            $data = $dataAll->values()->map(function($v){
                return json_decode(json_decode($v),true);
            })->unique('timestamp')->values()->toArray();
            return response(['data' => $data, 'message' => "Done"], 200);
        }
    }
