<?php 

$crawl = $_GET['_escaped_fragment_'];

if (!empty($crawl)) {
    $parse = explode('/', $crawl);
    $id = $parse[2];
    header("Location: share.php?id=".$id);
} else {
    header("Location: home.html");
}