// frontend/app.js
const startMeetingButton = document.getElementById("startMeeting");

startMeetingButton.addEventListener("click", async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });

  const videoElement = document.createElement("video");
  videoElement.srcObject = stream;
  videoElement.autoplay = true;
  videoElement.controls = false;

  document.body.appendChild(videoElement);
});
