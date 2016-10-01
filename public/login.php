<?php

session_start();

require_once('../config/database.php');
$db->query("USE camagru");

$login = $db->quote($login);
$passwd = $db->quote($passwd);
$users = $db->query("SELECT login, password, confirm_hash FROM users;");
?>
