import React from 'react';
import socketio from 'socket.io-client';

const API_URL = process.env.REACT_APP_TARGET_ENV === 'development' ?
              `${process.env.REACT_APP_API_URL_ENV}` :
              `${process.env.REACT_APP_API_URL}`;

export const socket = socketio(`${API_URL}`, {
    transports: ['websocket'],
});
export const SocketContext = React.createContext();