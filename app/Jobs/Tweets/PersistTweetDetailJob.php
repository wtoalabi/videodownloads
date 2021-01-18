<?php

namespace App\Jobs\Tweets;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Redis;

class PersistTweetDetailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $data;
    private $requestInfo;
    
    /**
     * Create a new job instance.
     *
     * @param $data
     * @param $requestInfo
     */
    public function __construct($data, $requestInfo)
    {
        //
        $this->data = $data;
        $this->requestInfo = $requestInfo;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle() {
        $request = $this->requestInfo;
        $requester_id = $request['requester_id'];
        $request_id = $request['request_id'];
        try{
            Redis::HSET("VideoDownloads:Twitter:Users:$requester_id", $request_id, json_encode($this->data));
            //Redis::HGET("VideoDownloads:Twitter:Users:$requester_id", $request_id, json_encode($data));
            SendTweetJob::dispatch([
                'request_id'=>$request_id,
                'requester_id'=> $requester_id,
                'requester_name' => $request['requester_name'],
                'requester_screen_name' => $request['requester_screen_name'],
            ])->onQueue('send_tweet');
        }catch (\Exception $e){
            throw new $e();
        }
    }
}
