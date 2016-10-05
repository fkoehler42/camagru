function reset_msgs() {

  var msg1 = document.getElementById("register_msg");
  var msg2 = document.getElementById("signin_msg");
  var msg3 = document.getElementById("main_msg");
  var msg4 = document.getElementById("resetpass_msg");

  if (msg1.innerHTML !== "" || msg1.style.display !== "none") {
    msg1.innerHTML = "";
    msg1.style.display = "none";
  }
  if (msg2.innerHTML !== "" || msg2.style.display !== "none") {
    msg2.innerHTML = "";
    msg2.style.display = "none";
  }
  if (msg3.innerHTML !== "" || msg3.style.display !== "none") {
    msg3.innerHTML = "";
    msg3.style.display = "none";
  }
  if (msg4.innerHTML !== "" || msg4.style.display !== "none") {
    msg4.innerHTML = "";
    msg4.style.display = "none";
  }
}
