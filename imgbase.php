<?php
    $id = $_GET['id'];
    $image = file_get_contents('https://izin-bertakut.firebaseio.com/image/'.$id.'.json');
     # we are a PNG image
    header('Content-type: image/png');

    $encoded = $image;
    $encoded = str_replace(' ', '+', $encoded);
    $encoded = str_replace('data:image/png;base64,', '', $encoded);
    $decoded = base64_decode($encoded);

    #write decoded data
    echo $decoded;
?>