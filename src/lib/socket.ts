import { io, Socket } from "socket.io-client";
const token = localStorage.getItem("token");
const socket: Socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
  // withCredentials: true,
  transports: ["websocket"],
  auth: {
    token,
  },
  reconnection: true,
  reconnectionAttempts: 5, // how many times to retry before giving up
  reconnectionDelay: 1000, // start with 1s
  reconnectionDelayMax: 5000, // max delay between retries
});
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error);
  if (error?.message === "Unauthorized") {
    // redirect or show login modal
  }
});

socket.io.on("reconnect_attempt", () => {
  socket.auth = { token: localStorage.getItem("token") };
});

export default socket;
