const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");

let io;

module.exports = {
  init: (server) => {
    io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"]
      }
    });

    io.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token;
        if (!token) return next(new Error("Socket Authentication error"));
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        next();
      } catch {
        return next(new Error("Socket Authentication error"));
      }
    });

    io.on("connection", (socket) => {
       const { userId } = socket?.handshake?.auth;
      if(!userId) return;
      socket.join(userId?.toString());
    });

    return io;
  },

  getIO: () => {
    if (!io) throw new Error("Socket.io not initialized!");
    return io;
  },

  emitToUsers: (userIds, event, data) => {
    if (!io) throw new Error("Socket.io not initialized!");
    io.to(userIds.map(id => id.toString())).emit(event, data);
  }
};
