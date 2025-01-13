const socket = io("http://localhost:5000"); // Replace with your backend URL
const roomId = "test-room"; // Use a dynamic room ID in the future
const userId = Math.random().toString(36).substring(2, 15); // Temporary user ID

// Join the room
socket.emit("join-room", roomId, userId);

socket.on("user-connected", (userId) => {
  console.log(`User connected: ${userId}`);
});

socket.on("user-disconnected", (userId) => {
  console.log(`User disconnected: ${userId}`);
});

// Media handling
const startMeetingButton = document.getElementById("startMeeting");

startMeetingButton.addEventListener("click", async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    const videoElement = document.createElement("video");
    videoElement.srcObject = stream;
    videoElement.autoplay = true;
    videoElement.muted = true; // Mute local video

    document.body.appendChild(videoElement);
  } catch (err) {
    console.error("Error accessing media devices:", err);
  }
});

// Firebase Chat
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const chatInput = document.getElementById("chatInput");
const sendButton = document.getElementById("sendButton");
const messagesDiv = document.getElementById("messages");

sendButton.addEventListener("click", async () => {
  const message = chatInput.value;
  if (message.trim()) {
    await addDoc(collection(db, "messages"), { text: message, timestamp: Date.now() });
    chatInput.value = "";
  }
});

onSnapshot(collection(db, "messages"), (snapshot) => {
  messagesDiv.innerHTML = ""; // Clear current messages
  snapshot.forEach((doc) => {
    const msg = document.createElement("div");
    msg.textContent = doc.data().text;
    messagesDiv.appendChild(msg);
  });
});