<?php
    /**
     * Created by Alabi Olawale
     * Date: 13/01/2021
     */
    namespace App\Http\Controllers\Videos\Stats;
    class Stats{
        public static function Persist($data) {
            $service = explode(":", $data->extractor)[0];
            ServiceAccessCount::Run($service);
            AccessedVideoDetails::Run($data, $service);
            
        }
    }
