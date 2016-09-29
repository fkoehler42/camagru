# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    database.php                                       :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: fkoehler <fkoehler@student.42.fr>          +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2016/09/29 10:53:09 by fkoehler          #+#    #+#              #
#    Updated: 2016/09/29 11:16:32 by fkoehler         ###   ########.fr        #
#                                                                              #
# **************************************************************************** #
<?php

$db_dsn = 'mysql:host=localhost;dbname=camagru';
$db_user = 'root';
$db_pass = 'root';

try {
    $db_handler = new PDO($db_dsn, $db_user, $db_pass);
	$db_handler->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    /* foreach($dbh->query('SELECT * from FOO') as $row) { */
        /* print_r($row); */
}
catch (PDOException $error) {
    echo "Database connection failed: " . $error->getMessage() . \n;
    die();
}

?>
