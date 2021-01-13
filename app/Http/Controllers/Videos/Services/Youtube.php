<?php
    /**
     * Created by Alabi Olawale
     * Date: 04/01/2021
     */
    
    namespace App\Http\Controllers\Videos\Services;
    
    
    use Illuminate\Support\Facades\Log;
    use \Exception;
    use Symfony\Component\Process\Exception\ProcessFailedException;
    use Symfony\Component\Process\Process;

    class Youtube implements Service{
        public function process($url) {
            $url = explode("&", $url)[0];
            dd($url);
            $process = Process::fromShellCommandline("youtube-dl $url -J");
            
            $process->run();

            if (!$process->isSuccessful()) {
                $e = new ProcessFailedException($process);
                Log::error($e);
                throw new Exception("Unable to download video...please try again later.");
            }
            return $process->getOutput();
        }
    }
