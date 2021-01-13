<?php

namespace App\Exceptions\Videos;

use Exception;

class VideoProcessingException extends Exception{
    public function register()
    {
        $this->reportable(function (InvalidOrderException $e) {
            //
        });
    }
}
