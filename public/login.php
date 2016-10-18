<?php

session_start();

require_once('../config/database.php');

$response = "";
$login = $_POST["login"];
$passwd = $db->quote(hash("whirlpool", $_POST["passwd"]));

$query = $db->query("SELECT user_id, login, password, confirm_hash FROM users
                    WHERE login = ".$db->quote($login)." AND password = $passwd");
$res = $query->fetch();
if ($res == NULL)
  $response = "Invalid username/password.<br/>";
else if ($res['confirm_hash'] !== "") {
  $response = "Your account is not active yet. Please click on the link sent by email (check your spams, wait a while).
              Still nothing ? You may contact the webmaster via the 'About' page.<br/>";
}
else
  $_SESSION['logged'] = $res['user_id'];
if ($response !== "")
  echo ($response);
?>
