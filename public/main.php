<main>
	<br/><br/><br/><br/>
	<h1>Welcome on Camagru !</h1>
	<div class="forms">
		<h2>Sign in</h2>
		<form id="signin" method="post" action="public/login.php" onsubmit="return(signin_validate());">
  			<input type="text" name="login" placeholder="Username" minlength="4" maxlength="30" required>
  			<input type="password" name="passwd" placeholder="Password" minlength="8" maxlength="40" required>
  			<input type="submit" name="submit" value="OK">
			<a href="password_reset.php">Forgot password ?</a>
		</form>
	</div>
	<div class="forms">
		<h2>Register</h2>
		<form id="register" method="post" action="public/register.php">
  			<input type="text" name="login" placeholder="Username" maxlength="30" required>
	  		<input type="password" name="passwd" placeholder="Password" required>
  			<input type="password" name="passwd_confirm" placeholder="Confirm Password" required>
			<input type="email" name="email" placeholder="Email" required>
  			<input type="submit" name="submit" value="OK">
		</form>
	</div>
</main>
