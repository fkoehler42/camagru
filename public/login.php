<?php

include (ROOT_DIR.'/config/database.php');

session_start();

if (isset($_POST['login']) && isset($_POST['passwd']))
{
	$_SESSION['loggued_on_user'] = $_POST['login'];
}
else
{
	header('Location: '.ROOT_DIR . /index.php);
	echo 'Please fill the fields'.PHP_EOL;
	die();
}
?>
