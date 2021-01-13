<?php
    namespace App\Jobs\Stats\Middleware;
    
    use Illuminate\Support\Facades\Redis;
    
    class RateLimited{
        public function handle($job, $next) {
            Redis::throttle('key')->allow(1)->every(5)
                ->then(function () use ($job, $next) {
                    $next($job);
                }, function () use ($job) {
                    $job->release(5);
                });
        }
        
    }
