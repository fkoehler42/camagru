
var	form = document.querySelector('#register');
form.addEventListener('submit', register_validate);

function signin_validate() {

	var msg = document.getElementById("signin_msg");
	var login_elem = document.getElementById("login");
	var login = login_elem.value.trim();
	var passwd_elem = document.getElementById("passwd");
	var passwd = passwd_elem.value.trim();

	msg.style.display = "none";
	msg.innerHTML = "";
	if (login == "" || login_elem.validity.RangeUnderflow ||
	login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,30}$/).test(login) == false) ||
	passwd == "" || passwd_elem.validity.RangeUnderflow ||
	passwd_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{8,40}$/).test(passwd) == false)) {
		msg.style.display = "block";
		msg.innerHTML = "Invalid username/password";
		return (false);
	}
	return (true);
}

function register_validate(evt) {

	evt.preventDefault();
	var msg = document.getElementById("register_msg");
	var login_elem = document.getElementById("username");
	var login = login_elem.value.trim();
	var passwd1_elem = document.getElementById("pass1");
	var passwd1 = passwd1_elem.value.trim();
	var passwd2_elem = document.getElementById("pass2");
	var passwd2 = passwd2_elem.value.trim();
	var	email_elem = document.getElementById("email");
	var	email = email_elem.value.trim();
	var xhr = new XMLHttpRequest();

	msg.style.display = "none";
	msg.innerHTML = "";
	if (login === "" || login_elem.validity.RangeUnderflow || login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,30}$/).test(login) == false))
		msg.innerHTML = "Username must be between 5 and 30 characters. Allowed characters are a-z, A-Z, 0-9, '-' and '_'";
	else if (passwd1 === "" || passwd1_elem.validity.RangeUnderflow ||	passwd1_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{8,40}$/).test(passwd1) == false))
		msg.innerHTML = "Password must be between 8 and 30 characters. Allowed characters are a-z, A-Z, 0-9, '-' and '_'";
	else if (passwd1.indexOf(login) !== -1)
		msg.innerHTML = "Password must not contains your username";
	else if (passwd1 !== passwd2)
		msg.innerHTML = "Password fields do not match";
	else if ((/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(email) == false)
		msg.innerHTML = "Email address is invalid";
		else {
			xhr.onreadystatechange = function() {
    		if (xhr.status == 200 && xhr.readyState == 4){
					msg.innerHTML = xhr.responseText;
					console.log(msg);
					if (msg.innerHTML !== "")
						msg.style.display = "block";
				}
			}
			xhr.open("POST", "public/register.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("login=" + login + "&passwd=" + passwd1 + "&email=" + email);
		}
	if (msg.innerHTML !== "")
		msg.style.display = "block";
}

function put_register_form() {

	var signin_div = document.getElementById("form1");
	var register_link = document.getElementById("register_link");
	var register_div = document.getElementById("form2");

	signin_div.style.display = "none";
	register_link.style.display = "none";
	register_div.style.display = "table";
}

function put_signin_form() {

	var signin_div = document.getElementById("form1");
	var register_link = document.getElementById("register_link");
	var register_div = document.getElementById("form2");

	signin_div.style.display = "table";
	register_link.style.display = "table";
	register_div.style.display = "none";
}
