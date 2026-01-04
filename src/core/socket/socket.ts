import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

// Function to initialize the socket connection
const initSocket = (): Socket => {
  if (!socket) {
    // Use environment variable with fallback to default
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
    socket = io(backendUrl, {
      transports: ['websocket', 'polling'],
      timeout: 20000,
      // Additional options for better connection handling
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

// Function to disconnect the socket
const disconnectSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

// Function to get the current socket instance (returns null if not initialized)
const getSocket = (): Socket | null => {
  return socket;
};

export { initSocket, disconnectSocket, getSocket };