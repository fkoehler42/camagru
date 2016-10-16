window.addEventListener('load', function(ev) {

  var xhr = new XMLHttpRequest(),
      photos_container = document.getElementById("photos_container"),
      filters_container = document.getElementById("filters_container"),
      video = document.getElementById("video");
      video_img = document.getElementById("video_img"),
      startbutton = document.getElementById("startbutton");
      g_filter_set = 0;

  startbutton.setAttribute("style", "background-color: red");
  back2cam.style.display = "block";
  xhr.onreadystatechange = function() {
    if (xhr.status == 200 && xhr.readyState == 4) {
      var imgs = xhr.responseText.split("\n");
      photos_container.innerHTML += imgs[0];
      filters_container.innerHTML += imgs[1];
    }
  }
  xhr.open("GET", "public/load_imgs.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send();
  load_cam();
});


function add_filter(filter) {

  var draw = new Image(),
      filter_canvas = document.getElementById("filter_canvas"),
      ctx = filter_canvas.getContext("2d");
      dst = streaming === true ? document.getElementById("video") :
                                    document.getElementById("video_img"),
      width = dst.width / 3,
      height = dst.height / 3;
  ctx.clearRect(0, 0, filter_canvas.width, filter_canvas.height);
  draw.src = filter.src;
  draw.onload = function () {
    ctx.drawImage(draw, width, height, width, height);
    document.getElementById("startbutton").removeAttribute("style");
    g_filter_set = 1;
  };
}


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


function reset_canvas(src) {

  var filter_canvas = document.getElementById("filter_canvas"),
      ctx = filter_canvas.getContext("2d");

  startbutton.setAttribute("style", "background-color: red");
  ctx.clearRect(0, 0, filter_canvas.width, filter_canvas.height);
  filter_canvas.setAttribute('width', src.width);
  filter_canvas.setAttribute('height', src.height);
  g_filter_set = 0;
}


document.getElementById("send_img").addEventListener("click", function(ev) {

  var file_input = document.getElementById("img_file"),
      img = document.getElementById("video_img"),
      video = document.getElementById("video"),
      msg = document.getElementById("upload_msg");
      back2cam = document.getElementById("back2cam");
      filter_canvas = document.getElementById("filter_canvas");

  if (msg.innerHTML !== "") {
    msg.innerHTML = "";
    msg.style.display = "none";
  }
  if (file_input.value === "")
    msg.innerHTML = "Please choose a file.<br/>"
  else if (isImage(file_input.value) === false)
    msg.innerHTML = "Invalid file.<br/>"
  else if (file_input.files[0].size > 4096000) {
    msg.innerHTML = "File size limit exceeded.<br/>";
  }
  else {
    var reader = new FileReader();
    reader.onload = function (ev) {
      if (streaming === true) {
      //  var track = video_stream.getTracks()[0];
      //  track.stop(); ** pause() method is easier to use to launch back the cam later**
        video.pause();
        streaming = false;
        back2cam.style.display = "block";
      }
      video.style.display = "none";
      img.style.display = "inherit";
      img.setAttribute("src", ev.target.result);
      reset_canvas(img);
    }
    reader.readAsDataURL(file_input.files[0]);
    file_input.value = null;
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
            photo_default.setAttribute("width", g_width);
            photo_default.setAttribute("height", g_height);
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


  function reload_cam() {
    video.style.display = "inherit";
    video_img.style.display = "none";
    reset_canvas(video);
    video.play();
  }


  function load_cam() {

  streaming = false;
  var video = document.querySelector('#video'),
      cover = document.querySelector('#cover'),
      container = document.querySelector('#photos_container');
      startbutton = document.querySelector('#startbutton'),
      back2cam = document.querySelector('#back2cam');
      filter_canvas = document.querySelector('#filter_canvas');
      g_width = 640,
      g_height = 480;

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

    img.setAttribute('width', g_width);
    img.setAttribute('height', g_height);
    img.setAttribute('class', 'photos');
    img.setAttribute('onclick', 'delete_img(this)');
    img.setAttribute('style', 'cursor:pointer');
  }

  video.addEventListener('canplay', function(ev) {

    if (!streaming) {
      g_height = video.videoHeight / (video.videoWidth/g_width);
      video.setAttribute('width', g_width);
      video.setAttribute('height', g_height);
      filter_canvas.setAttribute('width', g_width);
      filter_canvas.setAttribute('height', g_height);
      streaming = true;
      back2cam.style.display = "none";
    }
  }, false);

  function takephoto(canvas) {

    var img,
        video_img = document.getElementById("video_img");
    if (streaming === true)
      canvas.getContext('2d').drawImage(video, 0, 0, g_width, g_height);
    else {
      canvas.setAttribute("width", video_img.width);
      canvas.setAttribute("height", video_img.height);
      canvas.getContext('2d').drawImage(video_img, 0, 0, video_img.width, video_img.height);
    }
    img = canvas.toDataURL('image/png');
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
    else
      console.log("No picture data received");
  }

  startbutton.addEventListener('click', function(ev) {

    var photo_default = document.getElementById("photo_default"),
        photos_array = document.getElementsByClassName("photos");

    if (g_filter_set === 0) {
      alert("You must choose a picture before taking a photo");
      return ;
    }
    canvas = document.createElement("canvas");
    set_img_attributes(canvas);
    container.insertBefore(canvas, photos_array[0]);
    if (photo_default !== null)
      photo_default.parentNode.removeChild(photo_default);
    var img = takephoto(canvas);
    savephoto(canvas, img);
    ev.preventDefault();
  }, false);

}
