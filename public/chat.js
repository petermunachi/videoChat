let socket = io.connect("http://localhost:4000");

let divVideoChatLobby = document.getElementById("video-chat-lobby");
let divVideoChat = document.getElementById("video-chat-room");
let joinButton = document.getElementById("join");
let userVideo = document.getElementById("user-video");
let peerVideo = document.getElementById("peer-video");
let roomInput = document.getElementById("roomName");

joinButton.addEventListener("click", function () {
  if (roomInput.value == '') {
    alert("please enter a room name")
  } else {
    socket.emit('join', roomInput.value);

    divVideoChatLobby.style = "display:none"
    // Prefer camera resolution nearest to 1280x720.
    var constraints = { audio: false, video: { width: 1280, height: 720 } };

    navigator.mediaDevices.getUserMedia(constraints)
    .then(function(mediaStream) {
      userVideo.srcObject = mediaStream;
      userVideo.onloadedmetadata = function(e) {
        userVideo.play();
      };
    })
    .catch(function(err) { console.log(err.name + ": " + err.message); }); // always check for errors at the end.

  
  }
})