import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import env from './config/env.js';

let io;

export function initSocket(httpServer) {
  io = new Server(httpServer, {
    cors: {
      origin: [env.clientUrl, 'http://localhost:5173'],
      credentials: true,
    },
  });

  // JWT auth middleware for sockets
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Authentication required'));
    try {
      const payload = jwt.verify(token, env.jwtSecret);
      socket.userId = payload.sub;
      socket.userRole = payload.role;
      next();
    } catch {
      next(new Error('Invalid token'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`[khel] Socket connected: ${socket.userId}`);

    // Join user to their own room
    socket.join(`user:${socket.userId}`);

    // Multiplayer matchmaking
    socket.on('multiplayer:join', (data) => {
      const room = `game:${data.gameId}`;
      socket.join(room);
      const clients = io.sockets.adapter.rooms.get(room);
      const playerCount = clients ? clients.size : 0;
      io.to(room).emit('multiplayer:playerCount', { gameId: data.gameId, count: playerCount });

      if (playerCount >= 2) {
        io.to(room).emit('multiplayer:start', {
          gameId: data.gameId,
          players: [...clients].map(id => {
            const s = io.sockets.sockets.get(id);
            return { socketId: id, userId: s?.userId };
          }),
        });
      }
    });

    socket.on('multiplayer:progress', (data) => {
      const room = `game:${data.gameId}`;
      socket.to(room).emit('multiplayer:opponentProgress', {
        userId: socket.userId,
        score: data.score,
        currentItem: data.currentItem,
      });
    });

    socket.on('multiplayer:finish', (data) => {
      const room = `game:${data.gameId}`;
      io.to(room).emit('multiplayer:playerFinished', {
        userId: socket.userId,
        score: data.score,
        time: data.time,
      });
    });

    socket.on('multiplayer:leave', (data) => {
      socket.leave(`game:${data.gameId}`);
    });

    socket.on('disconnect', () => {
      console.log(`[khel] Socket disconnected: ${socket.userId}`);
    });
  });

  return io;
}

export function getIO() {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
}
