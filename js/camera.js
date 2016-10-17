window.addEventListener('load', function(ev) {

  var xhr = new XMLHttpRequest(),
      photos_container = document.getElementById("photos_container"),
      filters_container = document.getElementById("filters_container"),
      video = document.getElementById("video");
      video_img = document.getElementById("video_img"),
      startbutton = document.getElementById("startbutton");
      g_filter_set = 0;

  startbutton.setAttribute("style", "background-color: red");
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


function get_resize_coef(src, dst) {

  var coef = 1.00;
  while (((src.naturalWidth * coef) > (dst.width / 2)) &&
        ((src.naturalHeight * coef) > (dst.height / 2)))
    coef = coef - 0.05;
  return (coef);
}


function add_filter(filter) {

  var draw = new Image(),
      filter_canvas = document.getElementById("filter_canvas"),
      ctx = filter_canvas.getContext("2d");
      dst = streaming === true ? document.getElementById("video") :
      document.getElementById("video_img"),
      coef = get_resize_coef(filter, dst);

  ctx.clearRect(0, 0, filter_canvas.width, filter_canvas.height);
  draw.src = filter.src;
  draw.onload = function () {
    ctx.drawImage(draw, dst.width / 3, dst.height / 3,
    filter.naturalWidth * coef, filter.naturalHeight * coef);
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


function clear_filter_display(src) {

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
      msg = document.getElementById("upload_msg"),
      back2cam = document.getElementById("back2cam"),
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
    reader.onloadend = function (ev) {
      img.setAttribute("src", ev.target.result);
      if (streaming === true) {
      //  var track = video_stream.getTracks()[0];
      //  track.stop(); ** pause() method is easier to use to launch back the cam later**
        video.pause();
        streaming = false;
      }
      back2cam.style.display = "block";
      video.style.display = "none";
      img.style.display = "inherit";
      clear_filter_display(img);
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
          console.log(xhr.responseText);
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


  function reload_cam() {
    video.style.display = "inherit";
    video_img.style.display = "none";
    clear_filter_display(video);
    video.play();
  }


  function load_cam() {

  streaming = false;
  var video = document.querySelector('#video'),
      cover = document.querySelector('#cover'),
      container = document.querySelector('#photos_container'),
      startbutton = document.querySelector('#startbutton'),
      back2cam = document.querySelector('#back2cam'),
      canvas = document.createElement("canvas"),
      filter_canvas = document.querySelector('#filter_canvas'),
      g_width = 640,
      g_height = 480;

  canvas.setAttribute("width", g_width);
  canvas.setAttribute("height", g_height);

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

      video_stream = stream; //a supprimer si methode utilisée == pause()
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
    canvas.getContext('2d').drawImage(video, 0, 0, g_width, g_height);
    img = canvas.toDataURL('image/png');
    return (img);
  }

  function save_and_display_photo(img_data, filter_data) {

    var xhr = new XMLHttpRequest(),
        photos_array = document.getElementsByClassName("photos");

    if (img_data !== "" && filter_data !== "") {
  		xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
          if (xhr.responseText.indexOf("Error") === -1) {
            var photo = document.createElement("img");
            set_img_attributes(photo);
            photo.src = xhr.responseText;
            container.insertBefore(photo, photos_array[0]);
          }
          else
            console.log(xhr.responseText);
        }
      }
      xhr.open("POST", "public/store_img.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("img=" + img_data + "&filter=" + filter_data);
  	}
    else
      console.log("Data missing to save the photo");
  }

  startbutton.addEventListener('click', function(ev) {

    var img,
        filter = document.getElementById("filter_canvas"),
        photo_default = document.getElementById("photo_default");

    if (g_filter_set === 0) {
      alert("You must choose a picture before taking a photo");
      return ;
    }
    if (photo_default !== null)
      photo_default.parentNode.removeChild(photo_default);
    if (streaming === true) {
      img = takephoto(canvas);
      canvas.getContext("2d").clearRect(0, 0, g_width, g_height);
    }
    else
      img = document.getElementById("video_img").src;
    save_and_display_photo(img, filter.toDataURL("image/png"));
    ev.preventDefault();
  }, false);
}
