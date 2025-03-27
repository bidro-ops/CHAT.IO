import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});


const userSocketMap = {}; 
const roomMembers = {};

export function getRoomMembers(userId) {
  return roomMembers[roomId] || [];
}



io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

      if (userSocketMap[userId]) {
    console.log(`🔄 Replacing old socket for user ${userId}`);
    delete userSocketMap[userId];
  }

  userSocketMap[userId] = socket.id;
  console.log(`🟢 User ${userId} is online (Socket ID: ${socket.id})`);

    socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId); // Join the socket.io room
    if (!roomMembers[roomId]) roomMembers[roomId] = [];
    if (!roomMembers[roomId].includes(userId)) {
      roomMembers[roomId].push(userId);
    }
    console.log(`👥 User ${userId} joined room ${roomId}`);

    // Notify room members
    io.to(roomId).emit("roomMembersUpdate", roomMembers[roomId]);
  });


    socket.on("leaveRoom", ({ roomId }) => {
    socket.leave(roomId);
    if (roomMembers[roomId]) {
      roomMembers[roomId] = roomMembers[roomId].filter((id) => id !== userId);
      io.to(roomId).emit("roomMembersUpdate", roomMembers[roomId]);
    }
    console.log(`🚪 User ${userId} left room ${roomId}`);
  });


    socket.on("sendMessage", ({ roomId, senderId, message }) => {
    console.log(`📩 Message in room ${roomId} from user ${senderId}:`, message);
    io.to(roomId).emit("newMessage", { senderId, message });
  });


   socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    delete userSocketMap[userId];

    // Remove user from any rooms
    for (const roomId in roomMembers) {
      roomMembers[roomId] = roomMembers[roomId].filter((id) => id !== userId);
      io.to(roomId).emit("roomMembersUpdate", roomMembers[roomId]);
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });


  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
});

export { io, app, server };