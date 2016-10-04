<?php

session_start();

require_once('../config/database.php');
$db->query("USE camagru");

$response = "";
$login = $db->quote($_POST["login"]);
$passwd = $db->quote(hash("whirlpool", $_POST["passwd"]));

$query = $db->query("SELECT login, password, confirm_hash FROM users
                    WHERE login = $login AND password = $passwd");
$res = $query->fetch();
if ($res == NULL)
  $response = "Invalid username/password<br/>";
else {
  //check if $res["confirm_hash"] != NULL
  
}
?>
