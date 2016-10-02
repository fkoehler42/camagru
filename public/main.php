<main>
	<br/><br/><br/><br/>
	<h1>Welcome on Camagru !</h1>
	<div id="form1" class="forms">
		<h2>Sign in</h2>
		<form id="signin" method="post" action="public/login.php" onsubmit="return(signin_validate());">
  			<input id="login" type="text" placeholder="Username" minlength="5" maxlength="30" required>
  			<input id="passwd" type="password" placeholder="Password" minlength="8" maxlength="30" required>
				<p id="signin_msg" display="none"></p>
  			<input id="signin_submit" type="submit" value="OK">
			<a href="password_reset.php">Forgot password ?</a>
		</form>
	</div>
	<div id="register_link" class="forms">
		<h3>Not yet registered ?</h3>
		<button type="button" onclick="put_register_form()">Join us !</button>
	</div>
	<div id="form2" class="forms">
		<h2>Register</h2>
		<form id="register" method="post">
  		<input id="username" type="text" placeholder="Username" minlength="5" maxlength="30" required>
	  	<input id="pass1" type="password" placeholder="Password" minlength="8" maxlength="30" required>
  		<input id="pass2" type="password" placeholder="Confirm Password" minlength="8" maxlength="30" required>
			<input id="email" type="email" placeholder="Email" required>
			<p id="register_msg" display="none"></p>
  		<input id="register_submit" type="submit" value="OK">
			<button id="back" type="button" onclick="put_signin_form()">Back</button>
		</form>
	</div>
</main>
