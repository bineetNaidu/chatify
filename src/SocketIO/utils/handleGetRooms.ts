/* eslint-disable comma-dangle */
import User from '../../models/User';

export default function handleGetRooms(socket: any) {
  socket.on('GET_ROOMS', async (data: { userId: string }) => {
    try {
      const user = await User.findOne({ _id: data.userId }).populate('rooms');

      // ? The Client Will Do the Bussiness
      socket.emit('FOUND_ROOMS', user?.rooms);
      console.log(user?.rooms);
      // ? w/ io.on('USER_ACTIVE', userDate)
      console.log(`${user?.name} recieved rooms`);
    } catch (e) {
      console.log('ERROR: ', e.message);
    }
  });
}
