<?php

namespace App\Console\Commands;

use App\Bots\TwitterBot\TwitterStream;
use App\Jobs\Tweets\SendTweetJob;
use Illuminate\Console\Command;

class ConnectToStreamingAPI extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'twitter:api_stream_connect';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Connect to the Twitter Streaming API';
    
    protected $twitterStream;
    
    /**
     * Create a new command instance.
     *
     * @param TwitterStream $twitterStream
     */
    public function __construct(TwitterStream $twitterStream)
    {
        $this->twitterStream = $twitterStream;
        
        parent::__construct();
    }
    
    
    /**
     * Execute the console command.
     *
     * @return void
     * @throws \ErrorException
     */
    public function handle() {
        /*SendTweetJob::dispatch(
            [
                'requester_name' => "AppsBay",
                'requester_screen_name' => "apps_bay",
                'request_id'=>1350035651803099136,
                'requester_id'=>1271852314538672136
            ]
        )->onQueue('send_tweet');*/
        
        //Redis::HGET("VideoDownloads:Twitter:Users:$requester_id", $request_id, json_encode($data));
        
        $twitter_consumer_key = env('TWITTER_CONSUMER_KEY', '');
        $twitter_consumer_secret = env('TWITTER_CONSUMER_SECRET', '');
    
        $this->twitterStream->consumerKey = $twitter_consumer_key;
        $this->twitterStream->consumerSecret = $twitter_consumer_secret;
        $this->twitterStream->setTrack(["@VideoPlucker"]);
        $this->twitterStream->setFollow([1271850983388262406]);
        $this->twitterStream->setLocations([]);
        $this->twitterStream->consume();
    }
}
