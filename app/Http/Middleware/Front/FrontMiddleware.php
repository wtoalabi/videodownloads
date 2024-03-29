<?php

namespace App\Http\Middleware\Front;

use Closure;
use Illuminate\Http\Request;

class FrontMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next) {
        return $next($request);
    }
}
