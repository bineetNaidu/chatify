/* eslint-disable comma-dangle */
import User from '../../models/User';
import Room from '../../models/Room';
import Chat from '../../models/Chat';

export default function handleCreateChat(socket: any) {
  socket.on(
    'CREATE_CHAT',
    async (data: {
      userId: string;
      roomId: string;
      senderId: string;
      text: string;
    }) => {
      try {
        console.table(data);
        const masterUser = await User.findOne({ _id: data.userId }).populate(
          'rooms'
        );
        const room = await Room.findOne({
          _id: data.roomId,
          master: data.userId,
        }).populate('chats');
        const inviteeUser = await User.findOne({ _id: room?.invitee });

        if (masterUser && inviteeUser) {
          const chat = new Chat({
            senderId: data.senderId,
            text: data.text,
          });
          await chat.save();

          room?.chats.push(chat.id);
          await room?.save();

          socket.emit('CHAT_DELIVERED', {
            userId: masterUser.id,
            invitee: inviteeUser.id,
            room,
          });
        }
      } catch (e) {
        console.log('ERROR: ', e.message);
      }
    }
  );
}
