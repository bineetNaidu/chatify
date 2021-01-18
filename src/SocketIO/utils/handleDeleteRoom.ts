/* eslint-disable comma-dangle */
import User from '../../models/User';
import Room from '../../models/Room';
import Chat from '../../models/Chat';

export default function handleDeleteRoom(socket: any) {
  socket.on('DELETE_ROOM', async (data: { userId: string; roomId: string }) => {
    try {
      const masterUser = await User.findOne({ _id: data.userId }).populate(
        'rooms'
      );
      const room = await Room.findOne({ _id: data.roomId });
      const inviteeUser = await User.findOne({ _id: room?.invitee });
      // eslint-disable-next-line no-underscore-dangle
      // const isRoomMaster = masterUser?._id === room?.master;
      // eslint-disable-next-line no-underscore-dangle
      // const isRoomInvitee = room?.invitee === inviteeUser?._id;

      // if (isRoomMaster && isRoomInvitee) { // ? check for this
      const filteredMasterUserRoom = masterUser?.rooms.filter(
        (r) => r !== room?.id
      );
      const filteredInviteeUserRoom = inviteeUser?.rooms.filter(
        (r) => r !== room?.id
      );

      masterUser?.set({ rooms: filteredMasterUserRoom });
      await masterUser?.save();

      inviteeUser?.set({ rooms: filteredInviteeUserRoom });
      await inviteeUser?.save();

      if (room?.chats !== undefined) {
        // eslint-disable-next-line no-restricted-syntax
        for (const chatId of room?.chats) {
          // eslint-disable-next-line no-await-in-loop
          await Chat.findByIdAndRemove(chatId);
        }
      }

      await room?.delete();

      socket.emit('ROOM_DELETED', {
        userId: masterUser?.id,
        data: masterUser?.rooms,
      });

      // }
    } catch (e) {
      console.log('ERROR: ', e.message);
    }
  });
}
