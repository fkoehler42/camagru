<?php

require('database.php');

// Database structure creation via PDO instance

$db_handler->query("CREATE DATABASE IF NOT EXISTS camagru CHARACTER SET utf8;
					USE camagru");

$db_handler->query("CREATE TABLE IF NOT EXISTS users
					(
						user_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						login VARCHAR(40) UNIQUE NOT NULL,
						password VARCHAR(128) NOT NULL,
						mail VARCHAR(128) UNIQUE NOT NULL,
						confirm_hash VARCHAR(128) NOT NULL
					)");

$db_handler->query("CREATE TABLE IF NOT EXISTS images
					(
						img_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						link TEXT NOT NULL,
						author_id INT(10) NOT NULL,
						pub_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
						nb_likes INT(6) NOT NULL DEFAULT 0
					)");

$db_handler->query("CREATE TABLE IF NOT EXISTS comments
					(
						com_id INT(6) PRIMARY KEY AUTO_INCREMENT NOT NULL,
						img_id INT(6) NOT NULL,
						author_id INT(6) NOT NULL,
						content MEDIUMTEXT NOT NULL
					)");
?>