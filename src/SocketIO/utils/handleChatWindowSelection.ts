/* eslint-disable comma-dangle */
import User from '../../models/User';
import Room from '../../models/Room';

export default function handleChatWindowSelection(socket: any) {
  socket.on(
    'GET_CHAT_WINDOW_SELECTION',
    async (data: { userId: string; roomId: string }) => {
      try {
        const user = await User.findById(data.userId);

        const isUsersRoom = user?.rooms.includes(data.roomId);

        if (isUsersRoom) {
          const room = await Room.findById(data.roomId).populate('chats');

          socket.emit('CHAT_WINDOW_SELECTED', {
            userId: user?.id,
            room,
          });
        }
      } catch (e) {
        console.log('ERROR: ', e.message);
      }
    }
  );
}
