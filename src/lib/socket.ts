import { io, Socket } from "socket.io-client";
const token = localStorage.getItem("token");
const socket: Socket = io("http://localhost:3000", {
  // withCredentials: true,
  transports: ["websocket"],
  auth: {
    token,
  },
});
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error);
});

export default socket;
