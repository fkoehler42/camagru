<?php

session_start();

require_once('../config/database.php');
$db->query("USE camagru");

$login = $db->quote($_POST['login']);
$passwd = $db->quote(hash("whirlpool", $_POST['passwd']));
$email = $db->quote($_POST['email']);

$query = $db->query("SELECT COUNT(login) FROM users WHERE login = $login");
$res = $query->fetch();
if ($res[0] > 0)
  echo ("Username ".$login." already exists");
else {
  $query = $db->query("SELECT COUNT(email) FROM users WHERE email = $email");
  $res = $query->fetch();
  if ($res[0] > 0)
    echo ("Email address ".$email." already exists");
  else {
    $token = $db->quote(bin2hex(random_bytes(16)));
    $db->query("INSERT INTO users (login, password, email, confirm_hash) VALUES ($login, $passwd, $email, $token)");
  }
}

?>
