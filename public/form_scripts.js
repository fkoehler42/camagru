function signin_validate() {

	var error = document.createElement("p");
	error.innerHTML = 'Invalid username/password';
	var form = document.getElementById("signin");
	var login = document.getElementsByName("login")[0];
	var login_val = login.value.trim();
	var passwd = document.getElementsByName("passwd")[0];
	var passwd_val = passwd.value.trim();

	if (login_val == "" || login.validity.RangeUnderflow ||
		login.validity.RangeOverflow ||
		((/^[a-z0-9_-]{4,30}$/).test(login_val) == false) ||
		passwd_val == "" || passwd.validity.RangeUnderflow ||
		passwd.validity.RangeOverflow ||
		((/^[a-z0-9_-]{8,40}$/).test(passwd_val) == false))
	{
		form.insertBefore(error, passwd.nextSibling);
		return (false);
	}
	return (true);
}
