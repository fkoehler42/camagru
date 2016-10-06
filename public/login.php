<?php

session_start();

require_once('../config/database.php');

$response = "";
$login = $db->quote($_POST["login"]);
$passwd = $db->quote(hash("whirlpool", $_POST["passwd"]));

$query = $db->query("SELECT login, password, confirm_hash FROM users
                    WHERE login = $login AND password = $passwd");
$res = $query->fetch();
if ($res == NULL)
  $response = "Invalid username/password.<br/>";
else if ($res['confirm_hash'] !== "") {
  $response = "Your account is not active yet. Please click on the link sent by email (check your spams, wait a while).
              Still nothing ? You may contact the webmaster via the 'About' page.<br/>";
}
if ($response !== "")
  echo ($response);
?>
