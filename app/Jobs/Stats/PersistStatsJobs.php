<?php
    
    namespace App\Jobs\Stats;
    
    use App\Http\Controllers\Videos\Stats\Stats;
    use App\Jobs\Stats\Middleware\RateLimited;
    use Illuminate\Bus\Queueable;
    use Illuminate\Contracts\Queue\ShouldBeUnique;
    use Illuminate\Contracts\Queue\ShouldQueue;
    use Illuminate\Foundation\Bus\Dispatchable;
    use Illuminate\Queue\InteractsWithQueue;
    use Illuminate\Queue\SerializesModels;
    
    class PersistStatsJobs implements ShouldQueue
    {
        use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
        
        private $data;
        
        /**
         * Create a new job instance.
         *
         * @param $data
         */
        public function __construct($data) {
            $this->data = $data;
        }
        /*
        public function middleware() {
            return [new RateLimited];
        }*/
    
    
        /**
         * Execute the job.
         *
         * @return void
         */
        public function handle() {
            
            Stats::Persist($this->data);
        }
    }
