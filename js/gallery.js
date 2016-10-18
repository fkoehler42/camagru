window.addEventListener('load', function(ev) {

  var xhr = new XMLHttpRequest ();

  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      console.log(xhr.responseText);
    }
  }
  xhr.open("GET", "load_gallery.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
});
