
function signin_validate() {

	var msg = document.getElementById("signin_msg");
	var login_elem = document.getElementById("login");
	var login = login_elem.value.trim();
	var passwd_elem = document.getElementById("passwd");
	var passwd = passwd_elem.value.trim();
	var xhr = new XMLHttpRequest();

	reset_msgs();
	if (login === "" || login_elem.validity.RangeUnderflow ||
	login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,30}$/).test(login) == false) ||
	passwd === "" || passwd_elem.validity.RangeUnderflow ||
	passwd_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{8,40}$/).test(passwd) == false)) {
		msg.style.display = "block";
		msg.innerHTML = "Invalid username/password<br/>";
	}
	else {
		xhr.onreadystatechange = function() {
	    if (xhr.status == 200 && xhr.readyState == 4){
				msg.innerHTML = xhr.responseText;
				if (msg.innerHTML !== "")
					msg.style.display = "block";
				else {
						//put cam page
				}
			}
		}
			xhr.open("POST", "public/login.php", true);
			xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			xhr.send("login=" + login + "&passwd=" + passwd);
	}
}

function register_validate() {

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

	reset_msgs();
	if (login === "" || login_elem.validity.RangeUnderflow || login_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{5,30}$/).test(login) == false))
		msg.innerHTML += "Username must be between 5 and 30 characters. Allowed characters are a-z, A-Z, 0-9, '-' and '_'<br/>";
	if (passwd1 === "" || passwd1_elem.validity.RangeUnderflow ||	passwd1_elem.validity.RangeOverflow ||
	((/^[a-zA-Z0-9_-]{8,40}$/).test(passwd1) == false))
		msg.innerHTML += "Password must be between 8 and 30 characters. Allowed characters are a-z, A-Z, 0-9, '-' and '_'<br/>";
	if (passwd1.indexOf(login) !== -1)
		msg.innerHTML += "Password must not contains your username<br/>";
	if (passwd1 !== passwd2)
		msg.innerHTML += "Password fields do not match<br/>";
	if ((/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(email) == false)
		msg.innerHTML += "Email address is invalid<br/>";
	if (msg.innerHTML === "") {
		xhr.onreadystatechange = function() {
    	if (xhr.status == 200 && xhr.readyState == 4){
				msg.innerHTML = xhr.responseText;
				if (msg.innerHTML !== "")
					msg.style.display = "block";
				else {
					var validation_msg = document.getElementById("main_msg");
					validation_msg.innerHTML = "Thank you for your registration. An email was sent to "+ email + ", click on link inside to confirm your account creation<br/>";
					validation_msg.style.display = "block";
					put_signin_form();
				}
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

	reset_msgs();
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
