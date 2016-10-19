<?php	session_start(); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<link rel="stylesheet" type="text/css" href="../stylesheets/global.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/header.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/main.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/gallery.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/footer.css">
		<title>Camagru - Gallery</title>
	</head>
	<body>
	<?php
		include('header.php');
		include('footer.php');
	?>
  <main>
    <div id='gallery' class='main_container'>
			<?php require_once('load_gallery.php'); ?>
		</div>
  </main>
	<script src='../js/tools.js'></script>
	<script src='../js/gallery.js'></script>
	</body>
</html>
