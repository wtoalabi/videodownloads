<?php
   namespace App\Bots\TwitterBot;
   
    use App\Jobs\Tweets\ProcessTweetJob;
    use OauthPhirehose;

    class TwitterStream extends OauthPhirehose{
    
        /**
         * This is the one and only method that must be implemented additionally. As per the streaming API documentation,
         * statuses should NOT be processed within the same process that is performing collection
         *
         * @param string $status
         */
        public function enqueueStatus($status) {
            ProcessTweetJob::dispatch($status)->onQueue("process_tweet");
        }
    }
