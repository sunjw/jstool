<?php
$query_string = $_SERVER['QUERY_STRING'];
$to_page = "vsc";

$location = $to_page;
if ($query_string == "") {
    $query_string = "redirect_src=index";
}
$location = $location."/?".$query_string;
header("Location: ".$location);
exit();
?>
