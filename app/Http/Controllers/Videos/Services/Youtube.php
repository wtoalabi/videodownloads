<?php
    /**
     * Created by Alabi Olawale
     * Date: 04/01/2021
     */
    
    namespace App\Http\Controllers\Videos\Services;
    
    
    use Symfony\Component\Process\Exception\ProcessFailedException;
    use Symfony\Component\Process\Process;

    class Youtube implements Service{
        public function process($url) {
            $url = explode("&", $url)[0];
            $process = Process::fromShellCommandline("youtube-dl $url -J");
            
            $process->run();

            if (!$process->isSuccessful()) {
                throw new ProcessFailedException($process);
            }
            
            return response(['data' => $process->getOutput(), 'message' => "Done"], 200);
        }
    }
