/* eslint-disable comma-dangle */
import User from '../../models/User';

export default function handleUserActive(socket: any) {
  socket.on('USER_ACTIVE', async (sentData: { id: string }) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: sentData.id },
        { online: true }
      );
      await user?.save();

      // ? The Client Will Do the Bussiness
      socket.emit('USER_ACTIVE', user);
      // ? w/ io.on('USER_ACTIVE', userDate)
      console.log(`${user?.name} is active`);
    } catch (e) {
      console.log('ERROR: ', e.message);
    }
  });
}
