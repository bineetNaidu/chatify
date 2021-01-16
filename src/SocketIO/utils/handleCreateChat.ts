/* eslint-disable comma-dangle */
import Room from '../../models/Room';
import Chat from '../../models/Chat';

type Data = {
  senderId: string;
  text: string;
  roomId: string;
};

export default function handleUserActive(socket: any) {
  socket.on('CHAT_CREATED', async (data: Data) => {
    try {
      const room = await Room.findById(data.roomId).populate('chats');
      if (!room) {
        throw new Error('Room not Found');
      }
      const chat = new Chat(data);
      await chat.save();

      room.chats.push(chat.id);
      await room.save();

      socket.emit('ROOM_UPDATED', room);
    } catch (e) {
      console.log('ERROR: ', e.message);
    }
  });
}
