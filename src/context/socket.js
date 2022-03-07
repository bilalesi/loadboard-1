import React from 'react';
import socketio from 'socket.io-client';

export const socket = socketio.connect(process.env.REACT_APP_PROD_SOCKET_URL);
export const SocketContext = React.createContext();