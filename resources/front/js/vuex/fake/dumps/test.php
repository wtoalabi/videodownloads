<?php
    
    $f = "Product Key: 4NBRB-YKR2P-MFWBM-2V768-D9PXT


  Download Link: https://setup.office.com
";
    
    $arr = explode("<>", $f);
    $arr_string = "";
    for ($i = 0; $i < count($arr); $i++) {
        $entry = $arr[$i];
        if (strlen($entry) >= 5) {
            $arr_string = $arr_string . "<br />" . $entry;
        }
    }
    echo $arr_string;
    
