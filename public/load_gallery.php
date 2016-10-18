<?php

require_once('../config/database.php');

$response = "";
$query = $db->query("SELECT img_id, link, users.login AS 'author', nb_likes FROM images
                    INNER JOIN users ON images.author_id = users.user_id
                    ORDER BY pub_date DESC");
while (($res = $query->fetch(PDO::FETCH_ASSOC)) !== false) {
  $start = strrpos($res['link'], "/");
  $img = substr($res['link'], $start, strlen($res['link']) - $start);
  $response .= $img."\0".$res['author']."\0".$res['nb_likes']."\n";
}
echo ($response);
?>
