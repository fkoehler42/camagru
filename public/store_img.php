<?php

session_start();

require_once('../config/database.php');

$i = 0;
$img = $_POST['img'];
$login = $db->quote($_SESSION['logged']);
$dir = dirname(__FILE__, 2)."/images/upload/";

if ($login === "") {
  echo "No user logged";
  return ;
}
if (empty($img)) {
  echo "No data on request";
  return ;
}
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $dir."photo".$i.".png";
while (file_exists($file) == true) {
  $i++;
  $file = $dir."photo".$i.".png";
}
if (file_put_contents($file, $data) == false)
  echo "Error on file writing";
else {
  $db->query("INSERT INTO images (link, author)
              VALUES (".$db->quote($file).", $login)");
}
?>
