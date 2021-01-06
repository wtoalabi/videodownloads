<?php
    /**
     * Created by Alabi Olawale
     * Date: 04/01/2021
     */
    declare(strict_types=1);
    
    namespace App\Http\Controllers\Videos\Services;
    
    
    interface Service{
        public function process($url);
    }
