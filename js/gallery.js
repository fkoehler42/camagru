function escape_html(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}


function reset_msgs() {
  var msgs_array = document.getElementsByClassName("error_msg");
  for (var i = 0; i < msgs_array.length; i++) {
    if (msgs_array[i].innerHTML !== "") {
      msgs_array[i].innerHTML = "";
      msgs_array[i].style.display = "none";
    }
  }
}

function get_img_id(img_child_id) {
  var start = img_child_id.indexOf("_"),
      img_id = img_child_id.substr(start + 1);
  return (img_id);
}


function add_like(like_button) {

  var img_id = get_img_id(like_button.id),
      nb_likes = document.getElementById("nblikes_" + img_id),
      nb_likes_value = parseInt(nb_likes.innerHTML);
      error_msg = document.getElementById("pubmsg_" + img_id),
      xhr = new XMLHttpRequest();
  reset_msgs();
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if (xhr.responseText === "+1")
        nb_likes.innerHTML = nb_likes_value + 1;
      else if (xhr.responseText === "-1" && nb_likes_value > 0)
        nb_likes.innerHTML = nb_likes_value - 1;
      else {
        error_msg.innerHTML = xhr.responseText;
        error_msg.style.display = "block";
      }
    }
  }
  xhr.open("POST", "add_like.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("img_id=" + img_id);
}


function send_comment(com_button) {
  reset_msgs();
  var img_id = get_img_id(com_button.id),
      com_elem = document.getElementById("comcontent_" + img_id),
      com_content = com_elem.value.trim(),
      error_msg = document.getElementById("pubmsg_" + img_id),
      xhr = new XMLHttpRequest();
  alert(com_content);
  if (com_content === "")
    return ;
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      if (xhr.responseText === "")
        window.location.replace("../index.php");
      else if (xhr.responseText !== "OK") {
        error_msg.innerHTML = xhr.responseText;
        error_msg.style.display = "block"
      }
      else {
        var new_com = document.createElement("p");
        new_com.innerHTML = escape_html(com_content);
        com_elem.parentNode.insertBefore(new_com, com_elem);
      }
    }
  }
  xhr.open("POST", "send_com.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send("img_id=" + img_id + "&comment=" + com_content);
}
