<?php	session_start(); ?>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="initial-scale=1.0">
		<link rel="stylesheet" type="text/css" href="../stylesheets/global.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/main.css">
		<link rel="stylesheet" type="text/css" href="../stylesheets/banners.css">
		<title>Camagru - About</title>
	</head>
	<body>
	<?php require_once('header.php'); ?>
  <main>
    <h1>About / Contact</h1>
    <div id="contact_form" class="forms">
      <h2>What Camagru is ?</h2>
      <h3>Camagru is a project from IT development school '42' based in Paris.<br/>
        It consists of a web application allowing registered users to take photos from their camera or to upload images.<br/>
        To save a photo, the user needs to add a picture from the provided list, then both images are merged server-side.<br/>
        A gallery is also implemented, with a likes/comments system as on popular social networks.<br/>
        No framework or external library is allowed to produce this project, only browser's native javascript.<br/>
        For any questions, encountered issues or anything else please use the form below to contact me.<br/>
      </h3>
  		<form id="contact_form">
        <input id="contact_name" type="text" placeholder="Name" maxlength="30" required>
    		<input id="contact_email" type="email" placeholder="Email" required>
        <textarea id="contact_msg" class="input" placeholder="Message..." rows="7" required></textarea>
    		<input id="contact_submit" type="button" value="Send" minlenght="12" onclick="contact_me()">
        <p id='contact_notif_msg' class='error_msg'></p>
  		</form>
  	</div>
	</main>
  <?php require_once('footer.php'); ?>
	<script src='../js/about.js'></script>
	</body>
</html>
