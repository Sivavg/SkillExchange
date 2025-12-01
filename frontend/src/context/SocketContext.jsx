import React, { createContext, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { initSocket, disconnectSocket, getSocket } from '../utils/socket';

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      const token = localStorage.getItem('token');
      const socketInstance = initSocket(token);
      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        setConnected(true);
        console.log('Socket connected');
      });

      socketInstance.on('disconnect', () => {
        setConnected(false);
        console.log('Socket disconnected');
      });

      return () => {
        disconnectSocket();
      };
    }
  }, [user]);

  return (
    <SocketContext.Provider value={{ socket, connected }}>
      {children}
    </SocketContext.Provider>
  );
};
