<?php
    /**
     * Created by Alabi Olawale
     * Date: 13/01/2021
     */
    namespace App\Http\Controllers\Videos\Stats;
    class Stats{
        public static function Persist($data) {
            $service = $data->extractor;
            ServiceAccessCount::Run($service);
            AccessedVideoDetails::Run($data, $service);
            
        }
    }
