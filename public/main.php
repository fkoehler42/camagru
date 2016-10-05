<main>
	<br/><br/><br/><br/>
	<h1>Welcome on Camagru !</h1>
	<h3 id="main_msg" display="none"></h3>
	<div id="form1" class="forms">
		<h2>Sign in</h2>
		<form id="signin">
  			<input id="login" type="text" placeholder="Username" minlength="5" maxlength="30" required>
  			<input id="passwd" type="password" placeholder="Password" minlength="8" maxlength="30" required>
				<p id="signin_msg" display="none"></p>
  			<input id="signin_submit" type="button" value="OK" onclick="signin_validate()">
			<a href="#" onclick="put_resetpass_form()">Forgot password ?</a>
		</form>
	</div>
	<div id="register_link" class="forms">
		<h3>Not yet registered ?</h3>
		<button type="button" onclick="put_register_form()">Join us !</button>
	</div>
	<div id="form2" class="forms" style="display: none">
		<h2>Register</h2>
		<form id="register">
  		<input id="username" type="text" placeholder="Username" minlength="5" maxlength="30" required>
	  	<input id="pass1" type="password" placeholder="Password" minlength="8" maxlength="30" required>
  		<input id="pass2" type="password" placeholder="Confirm Password" minlength="8" maxlength="30" required>
			<input id="email" type="email" placeholder="Email" required>
			<p id="register_msg"></p>
  		<input id="register_submit" type="button" value="OK" onclick="register_validate()">
			<button class="back" type="button" onclick="put_signin_form()">Back</button>
		</form>
	</div>
	<div id="form3" class="forms" style="display: none">
		<h2>Reset password</h2>
		<form id="resetpass">
  		<input id="username" type="text" placeholder="Username" minlength="5" maxlength="30" required>
			<input id="email" type="email" placeholder="Email" required>
			<p id="resetpass_msg"></p>
  		<input id="resetpass_submit" type="button" value="OK" onclick="reset_passwd()">
			<button class="back" type="button" onclick="put_signin_form()">Back</button>
		</form>
	</div>
</main>
