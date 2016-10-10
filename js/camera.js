function isImage(file) {

  var dot_index;
  if ((dot_index = file.lastIndexOf(".")) < 1)
    return (false);
  var file_extension = file.substr(dot_index + 1);
  switch (file_extension.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return (true);
  }
  return (false);
}

document.getElementById("send_img").addEventListener("click", function(ev) {

  var file_input = document.getElementById("img_file");
  var img = document.getElementById("video_img");
  var video = document.getElementById("video");
  var msg = document.getElementById("upload_msg");

  if (msg.innerHTML !== "") {
    msg.innerHTML = "";
    msg.style.display = "none";
  }
  if (file_input.value === "")
    msg.innerHTML = "Please choose a file.<br/>"
  else if (isImage(file_input.value) === false)
    msg.innerHTML = "Invalid image file.<br/>"
  else if (file_input.files[0].size > 4096000) {
    msg.innerHTML = file_input.files[0].size / 1000;
  }
  else {
    var reader = new FileReader();
    reader.onload = function (ev) {
      var track = video_stream.getTracks()[0];
      track.stop();
      video.style.display = "none";
      img.setAttribute("src", ev.target.result);
      img.style.display = "block";
    }
    reader.readAsDataURL(file_input.files[0]);
  }
  if (msg.innerHTML !== "")
    msg.style.display = "block";
});

function delete_img(img) {

  if (confirm("Are you sure you want to delete this image ?")) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        if (xhr.responseText !== "")
          alert(xhr.responseText);
        else {
          img.parentNode.removeChild(img);
          if (document.getElementsByClassName("photos").length === 0) {
            var photo_default = document.createElement("img");
            photo_default.setAttribute("id", "photo_default");
            photo_default.setAttribute("class", "photos");
            photo_default.setAttribute("src", "images/icons/photo_default.jpg");
            photo_default.setAttribute("width", 320);
            photo_default.setAttribute("height", 240);
            document.getElementById("photos_container").appendChild(photo_default);
          }
        }
      }
    }
      xhr.open("POST", "public/delete_img.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("img=" + img.getAttribute("src"));
  }
}

window.addEventListener('load', function(ev) {

  var xhr = new XMLHttpRequest();
  var container = document.getElementById("photos_container");

    xhr.onreadystatechange = function() {
      if (xhr.status == 200 && xhr.readyState == 4) {
        container.innerHTML += xhr.responseText;
      }
    }
    xhr.open("GET", "public/load_imgs.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send();

});

(function() {

  var streaming = false,
      video = document.querySelector('#video'),
      cover = document.querySelector('#cover'),
      canvas = document.createElement("canvas"),
      container = document.getElementById("photos_container");
      startbutton = document.querySelector('#startbutton'),
      width = 320,
      height = 0;

  navigator.getMedia = ( navigator.getUserMedia ||
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia);

  navigator.getMedia(
    {
      video: true,
      audio: false
    },
    function(stream) {

      video_stream = stream;
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  function set_img_attributes(img) {

    img.setAttribute('width', width);
    img.setAttribute('height', height);
    img.setAttribute('class', 'photos');
    img.setAttribute('onclick', 'delete_img(this)');
    img.setAttribute('style', 'cursor:pointer');
  }

  video.addEventListener('canplay', function(ev) {

    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      set_img_attributes(canvas);
      streaming = true;
    }
  }, false);

  function takephoto() {

    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var img = canvas.toDataURL('image/png');
    return (img);
  }

  function savephoto(canvas, canvas_data) {

    var xhr = new XMLHttpRequest();
    if (canvas_data !== "") {
  		xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
          if (xhr.responseText.indexOf("Error") !== -1)
            alert(xhr.responseText);
          else
            canvas.setAttribute("src", xhr.responseText);
        }
      }
      xhr.open("POST", "public/store_img.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("img=" + canvas_data);
  	}
    else {
      console.log("No picture data received");
      return (1);
    }
  }

  startbutton.addEventListener('click', function(ev) {

    var photo_default = document.getElementById("photo_default");
    var photos_array = document.getElementsByClassName("photos");

    container.insertBefore(canvas, photos_array[0]);
    if (photo_default !== null)
      photo_default.parentNode.removeChild(photo_default);
    var img = takephoto();
    savephoto(canvas, img);
    canvas = document.createElement("canvas");
    set_img_attributes(canvas);
    ev.preventDefault();
  }, false);

})();
