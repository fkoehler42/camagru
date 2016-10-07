<header>
	<ul>
		<li><a href="camera.php">Take a picture</a></li>
		<li><a href="gallery.php">Gallery</a></li>
		<li><a href="about.php">About</a></li>

		<?php
			if (isset($_SESSION['logged']))
				echo "<li style='float:right'><a href='public/logout.php'>Logout</a></li>";
			else {
				$link = "http://".$_SERVER['HTTP_HOST'].substr($_SERVER['SCRIPT_NAME'], 0, (strpos($_SERVER['SCRIPT_NAME'], "/", 1) + 1))."index.php";
				echo "<li style='float:right'><a href='".$link."'>Sign in</a></li>";
			}
		?>

	</ul>
</header>
