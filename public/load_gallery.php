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
  $pub_date = substr($img_data['pub_date'], 0, strlen($img_data['pub_date']) - 3);

  echo ("<div class='post'>
        <h3 class='post_infos' style='float: left'>".$img_data['author']."</h3>
        <h3 class='post_infos' style='float: right'>".$pub_date."</h3>
        <img src='../images/upload".$img_link."'>
        <img class='like' src='../images/icons/like.png'><p class='nb_likes'>".$img_data['nb_likes']."</p></img>
        <button class='post_actions'>Like</button><button class='post_actions'>Comment</button>
        <div class='comments_container'>");
  while (($com_data = $com_query->fetch(PDO::FETCH_ASSOC)) !== false)
    echo ("<div class='comments'>".$com_data['author'].$com_data['content']."</div>");
  if ($_SESSION['logged'] === null)
    echo ("You must be logged in to post a comment");
  else
    echo ("<input type='text' placeholder='Comment...'><button class='send_com'>Post</button>");
  echo ("</div></div>");

}

?>
