<?php

// PDO instantiation to initiate MySQL server connection

$db_dsn = 'mysql:host=localhost;charset=utf8';
$db_user = 'root';
$db_pass = 'root';

try {
	$db_handler = new PDO($db_dsn, $db_user, $db_pass);
	$db_handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	/* foreach($dbh->query('SELECT * from FOO') as $row) { */
	/* print_r($row); */
}
catch (PDOException $error) {
	echo "Database connection failed: " . $error->getMessage() . PHP_EOL;
	die();
}

?>
