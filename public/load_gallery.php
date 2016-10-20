<?php

require_once('../config/database.php');

$img_query = $db->query("SELECT img_id, link, users.login AS 'author', pub_date, nb_likes FROM images
                        INNER JOIN users ON images.author_id = users.user_id
                        ORDER BY pub_date DESC");
while (($img_data = $img_query->fetch(PDO::FETCH_ASSOC)) !== false) {
  $com_query = $db->query("SELECT content, users.login AS 'author' FROM comments
                          INNER JOIN users ON comments.author_id = users.user_id
                          WHERE img_id = ".$db->quote($img_data['img_id']));

  $i = strrpos($img_data['link'], "/");
  $img_link = substr($img_data['link'], $i, strlen($img_data['link']) - $i);
  $img_id = $img_data['img_id'];
  $pub_date = substr($img_data['pub_date'], 0, strlen($img_data['pub_date']) - 3);

  $page_content = "<div class='publication'>
        <h3 class='post_infos' style='float: left'>".$img_data['author']."</h3>
        <h3 class='post_infos' style='float: right'>".$pub_date."</h3>
        <img class='gallery_photos' src='../images/upload".$img_link."'></img>
        <img id='addlike_".$img_id."' class='like' src='../images/icons/like.png' onclick='add_like(this)'>
        <p id='nblikes_".$img_id."' class='nb_likes'>".$img_data['nb_likes']."</p></img>
        <p id='pubmsg_".$img_id."' class='error_msg'></p>";
  $page_content .= "<div class='comments_container'>";
  while (($com_data = $com_query->fetch(PDO::FETCH_ASSOC)) !== false)
    $page_content .= "<div class='comments'>".$com_data['author'].$com_data['content']."</div>";
  if ($_SESSION['logged'] !== null) {
    $page_content .= "<input id='comcontent_".$img_id."' type='text' placeholder='Comment...'>
        <button id='sendcom_".$img_id."' class='send_com' onclick='send_comment(this)'>Send</button>";
}
  $page_content .= "</div></div>";
  echo ($page_content);
}

?>