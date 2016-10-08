<?php

session_start();

require_once('../config/database.php');

$login = $db->quote($_SESSION['logged']);
$response = "";

if ($login === "") {
  echo "Unable to retrieve the session user.<br/>";
  return ;
}
$query = $db->query("SELECT link FROM images WHERE author = $login ORDER BY img_id DESC LIMIT 10");
while (($res = $query->fetchColumn()) !== false) {
  $start = strrpos($res, "/");
  $img = substr($res, $start, strlen($res) - $start);
  $response .= "<img class='photos' src='images/upload$img'>";
}
if ($response === "") {
  $response = "<img id='photo_default' class='photos' src='images/icons/photo_default.jpg' width='320' height='240'>";
}
echo ($response);

?>
