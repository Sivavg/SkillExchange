import { io } from 'socket.io-client';
import { SOCKET_URL } from './constants';

let socket = null;

export const initSocket = (token) => {
  socket = io(SOCKET_URL, {
    auth: { token }
  });
  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
