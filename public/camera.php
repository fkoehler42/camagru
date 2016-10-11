<div id="camera">
  <div id="view">
    <h2>Take a shot !</h2>
    <video id="video" poster="http://placekitten.com/g/320/261"></video>
    <img id="video_img" src="#" alt="">
    <button id="startbutton">Snap it</button><br/>
    <div id="upload_img">
      <label for="img_file">Upload an image (JPEG/JPG/PNG/GIF format - Max 4 Mo) :</label>
      <input type="hidden" name="MAX_FILE_SIZE" value="4194304">
      <input id="img_file" type="file" name="img_file"></input>
      <button id="send_img">Upload</button>
      <p id="upload_msg" class="error_msg"></p>
      <a id="back2cam" href="javascript:reload_cam()" style="display: none">Switch to the camera view</a>
    </div>
  </div>
  <div id="photos_container">
    <h2>Saved pictures</h2>
  </div>
</div>
