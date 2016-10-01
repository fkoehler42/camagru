<?php

// PDO instantiation to initiate MySQL server connection

$db_dsn = 'mysql:host=localhost;charset=utf8';
$db_user = 'root';
$db_pass = 'w3bs3rver';

try {
	$db = new PDO($db_dsn, $db_user, $db_pass);
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $error) {
	echo "Database connection failed: " . $error->getMessage() . PHP_EOL;
	die();
}

?>
