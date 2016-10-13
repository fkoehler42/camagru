<?php

session_start();

if (!isset($_SESSION['logged'])) {
  header("location: ../index.php");
  die();
}

$filter = $_POST['src'];
$img = $_POST['dst'];

if (!isset($filter) || !isset($img)) {
  //http_response_code();
  die();
}
$start = strrpos($filter, "/");
$filter = "../images/filters".substr($filter, $start);

$start = strpos($img, "/") + 1;
$end = strpos($img, ";");
$img_type = substr($img, $start, $end - $start);
$img = str_replace('data:image/'.substr($img, $start, $end - $start).';base64,', '', $img);
$img = str_replace(' ', '+', $img);
$img = base64_decode($img);

$src = imagecreatefrompng($filter);
$dst = imagecreatefromstring($img);

$src_width = imagesx($src);
$src_height = imagesy($src);
$dst_width = imagesx($dst);
$dst_height = imagesy($dst);

imagecopyresampled($dst, $src, $dst_width * 0.33, $dst_height * 0.33, 0, 0, $dst_width / 2, $dst_height / 2, $src_width, $src_height);

ob_start();
switch ($img_type) {
  case 'jpg':
  case 'jpeg':
    imagejpeg($dst);
    break;
  case 'png':
    imagepng($dst);
    break;
  case 'gif';
    imagegif($dst);
    break;
}
imagedestroy($src);
imagedestroy($dst);

$data = ob_get_clean();
$final_img = base64_encode($data);
echo ("data:image/".$img_type.";base64,".$final_img);

?>
