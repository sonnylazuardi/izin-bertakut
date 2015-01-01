<?php
    $url=$_GET['url'];
    $url = str_replace('|', '&', $url);
    $img = file_get_contents($url);
    header('Content-Type: image/jpeg');
    echo $img;
?>