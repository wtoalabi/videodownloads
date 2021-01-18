<?php
    
    namespace App\Jobs\Tweets;
    
    use Illuminate\Bus\Queueable;
    use Illuminate\Contracts\Queue\ShouldBeUnique;
    use Illuminate\Contracts\Queue\ShouldQueue;
    use Illuminate\Foundation\Bus\Dispatchable;
    use Illuminate\Queue\InteractsWithQueue;
    use Illuminate\Queue\SerializesModels;
    use Illuminate\Support\Facades\Redis;
    use TwitterAPIExchange;
    use TwitterPhp\RestApi;
    
    class SendTweetJob implements ShouldQueue
    {
        use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
        /**
         * @var array
         */
        private $data;
        
        /**
         * Create a new job instance.
         *
         * @param array $data
         */
        public function __construct($data) {
            $this->data = $data;
        }
        
        /**
         * Execute the job.
         *
         * @return void
         */
        public function handle() {
            $data = $this->data;
            $requester_id = $data['requester_id'];
            $requester_name = $data['requester_name'];
            $requester_screen_name = $data['requester_screen_name'];
            $request_id = $data['request_id'];
            $settings = array(
                'oauth_access_token' => env("TWITTER_ACCESS_TOKEN"),
                'oauth_access_token_secret' => env("TWITTER_ACCESS_TOKEN_SECRET"),
                'consumer_key' => env("TWITTER_CONSUMER_KEY"),
                'consumer_secret' => env("TWITTER_CONSUMER_SECRET")
            );
            $url = 'https://api.twitter.com/1.1/statuses/update.json';
            $requestMethod = 'POST';
            $greetings = greetings($requester_name, $requester_screen_name);
            $postfields = array(
                'status' => "$greetings. Your video is ready. Click here to download right away! https://videodownloads.xyz/?from_twitter=$requester_id",
                'in_reply_to_status_id' => $request_id,
                'auto_populate_reply_metadata' => true,
                'possibly_sensitive' => false,
            );
            //dd($postfields);
            $twitter = new TwitterAPIExchange($settings);
            echo $twitter->buildOauth($url, $requestMethod)
                ->setPostfields($postfields)
                ->performRequest();
            
            //Redis::HSET("VideoDownloads:Twitter:Users:$requester_id", $request_id, json_encode($data));
            
        }
        
    }
    
    
    function greetings($name, $screen) {
        $pool = collect([
            "Yes! $name (@$screen)",
            "$name(@$screen) hi...",
            "Done...Done $name(@$screen)"
        ]);
        return $pool->random();
    }
