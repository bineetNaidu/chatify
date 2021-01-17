/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Server } from 'socket.io';
import handleUserActive from './utils/handleActiveUser';
import handleCreateChat from './utils/handleCreateChat';
import handleGetRooms from './utils/handleGetRooms';

export default function SocketIOServerConnection(io: Server) {
  io.on('connection', (socket) => {
    console.log('>> CONNECTED <<');

    handleUserActive(socket);

    handleCreateChat(socket);

    handleGetRooms(socket);

    socket.on('ROOM_CREATED', (room: any) => {
      socket.emit('ROOM_CREATED', room);
    });
  });
}
