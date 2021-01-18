<?php
    
    namespace App\Jobs\Tweets;
    
    use App\Http\Controllers\Videos\Services\Twitter;
    use App\Jobs\Stats\JobsToPersistStats;
    use App\Jobs\Stats\PersistStatsJobs;
    use Illuminate\Bus\Queueable;
    use Illuminate\Contracts\Queue\ShouldBeUnique;
    use Illuminate\Contracts\Queue\ShouldQueue;
    use Illuminate\Foundation\Bus\Dispatchable;
    use Illuminate\Queue\InteractsWithQueue;
    use Illuminate\Queue\SerializesModels;
    
    class ProcessTweetJob implements ShouldQueue
    {
        use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
        
        protected $tweet;
        
        /**
         * Create a new job instance.
         *
         * @param $tweet
         */
        public function __construct($tweet) {
            $this->tweet = $tweet;
        }
    
        /**
         * Execute the job.
         *
         * @return void
         * @throws \Exception
         */
        public function handle() {
            $tweet = json_decode($this->tweet, true);
            $url = $this->getUrl($tweet);
            $requestInfo = [
                'requester_id' => $tweet['user']['id'],
                'requester_name' => $tweet['user']['name'],
                'requester_screen_name' => $tweet['user']['screen_name'],
                'request_id' => $tweet['id']
            ];
            $twitter = new Twitter();
            $data = $twitter->process($url);
            PersistTweetDetailJob::dispatch($data, $requestInfo)->onQueue('persist_tweet');
            PersistStatsJobs::dispatch(json_decode($data))->onQueue('stats');
        }
    
        /**
         * @param $tweet
         * @return string
         */
        private function getUrl($tweet): string {
            $owner = $tweet['in_reply_to_screen_name'];
            $status_id = $tweet['in_reply_to_status_id'];
            $url = "https://twitter.com/$owner/status/$status_id";
            return $url;
        }
    }
