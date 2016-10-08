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

  video.addEventListener('canplay', function(ev) {

    if (!streaming) {
      height = video.videoHeight / (video.videoWidth/width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      canvas.setAttribute('class', 'photos');
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

  function savephoto(img) {

    var xhr = new XMLHttpRequest();
    if (img !== "") {
  		xhr.onreadystatechange = function() {
        if (xhr.status == 200 && xhr.readyState == 4) {
          console.log(xhr.responseText);
        }
      }
      xhr.open("POST", "public/store_img.php", true);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send("img=" + img);
  	}
    else
      console.log("No picture data received");
  }

  startbutton.addEventListener('click', function(ev) {

    var photo_default = document.getElementById("photo_default");
    var photos_array = document.getElementsByClassName("photos");

    container.insertBefore(canvas, photos_array[0]);
    if (photo_default !== null)
      photo_default.parentNode.removeChild(photo_default);
    var img = takephoto();
    savephoto(img);
    canvas = document.createElement("canvas");
    canvas.setAttribute("class", "photos");
    ev.preventDefault();
  }, false);

})();
