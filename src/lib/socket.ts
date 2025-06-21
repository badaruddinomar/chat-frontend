import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:4000", {
  withCredentials: true,
});
socket.on("connect", () => {
  console.log("✅ Socket connected:", socket.id);
});

socket.on("connect_error", (error) => {
  console.error("❌ Socket connection error:", error);
});

export default socket;
