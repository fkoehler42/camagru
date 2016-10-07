<?php	session_start(); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="stylesheets/global.css">
		<link rel="stylesheet" type="text/css" href="stylesheets/header.css">
		<link rel="stylesheet" type="text/css" href="stylesheets/camera.css">
		<link rel="stylesheet" type="text/css" href="stylesheets/main.css">
		<link rel="stylesheet" type="text/css" href="stylesheets/footer.css">
		<title>Camagru</title>
	</head>
	<body>
	<?php
		include('public/header.php');
		if (isset($_SESSION['logged'])) {
			include('public/camera.php');
			echo "<script src='js/camera.js'></script>";
		} else {
			include('public/main.php');
			echo "<script src='js/tools.js'></script><script src='js/forms_scripts.js'></script>";
		}
		include('public/footer.php');
	?>
	</body>
</html>
