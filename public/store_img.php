<?php

session_start();

$img = $_POST['img'];
$dir = dirname(__FILE__, 2)."/images/upload/";

if (empty($img)) {
  echo "No data on request";
  return ;
}
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $dir."photo.png";
if (file_put_contents($file, $data) == false)
  echo "Error on file writing";
else
  echo "OK";

?>
