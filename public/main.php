<main>
	<br/><br/><br/><br/>
	<h1>Welcome on Camagru !</h1>
	<div class="forms">
		<h2>Sign in</h2>
		<form method="post" action="public/login.php">
  			<input type="text" name="login" placeholder="Username" maxlength="30">
  			<br><br>
  			<input type="password" name="passwd" placeholder="Password">
  			<br><br>
  			<input type="submit" name="submit" value="OK">
  			<br><br>
			<a href="password_reset.php">Forgot password ?</a>
		</form>
	</div>
	<div class="forms">
		<h2>Register</h2>
		<form method="post" action="public/register.php">
  			<input type="text" name="login" placeholder="Username" maxlength="30">
  			<br><br>
	  		<input type="password" name="passwd" placeholder="Password">
  			<br><br>
  			<input type="password" name="passwd_confirm" placeholder="Confirm Password">
  			<br><br>
			<input type="email" name="email" placeholder="Email">
  			<br><br>
  			<input type="submit" name="submit" value="OK">
		</form>
	</div>
</main>
