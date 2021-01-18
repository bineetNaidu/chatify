/* eslint-disable comma-dangle */
/* eslint-disable no-unused-vars */
import { Server } from 'socket.io';
import handleUserActive from './utils/handleActiveUser';
import handleCreateChat from './utils/handleChatCreate';
import handleDeleteRoom from './utils/handleDeleteRoom';
import handleGetRooms from './utils/handleGetRooms';

export default function SocketIOServerConnection(io: Server) {
  io.on('connection', (socket) => {
    console.log('>> CONNECTED <<');

    handleUserActive(socket);

    handleGetRooms(socket);

    handleDeleteRoom(socket);

    handleCreateChat(socket);

    socket.on('ROOM_CREATED', (room: any) => {
      socket.emit('ROOM_CREATED', room);
    });
  });
}
