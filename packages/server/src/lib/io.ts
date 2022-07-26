import type { Server } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import type {
  ServerEmitEventsMap,
  ServerListenEventsMap,
} from '@chatify/types';
import { prisma } from './prisma.instance';

export const ioObserver = (
  io: Server<ServerListenEventsMap, ServerEmitEventsMap, DefaultEventsMap, {}>
) => {
  io.on('connection', (socket) => {
    socket.on('@join', async (user) => {
      const authUser = await prisma.user.findUnique({
        where: { id: user.id },
      });
      if (!authUser) {
        socket.emit('@joined', 'FAILED');
        return;
      } else {
        await socket.join(authUser.magicToken);
        io.to(authUser.magicToken).emit('@joined', 'OK', authUser);
      }

      socket.on('@fetch:users', async () => {
        const users = await prisma.user.findMany({
          where: {
            id: { not: authUser.id },
          },
        });
        io.to(authUser.magicToken).emit('@users:fetched', users);
      });

      socket.on('@fetch:user', async (id) => {
        const user = await prisma.user.findUnique({
          where: { id },
        });
        if (!user) return;
        const chats = await prisma.chat.findMany({
          where: {
            OR: [
              { fromUserId: authUser.id, toUserId: id },
              { fromUserId: id, toUserId: authUser.id },
            ],
          },
        });
        io.to(authUser.magicToken).emit('@user:fetched', user, chats);
      });

      socket.on('@send:chat', async (chat) => {
        const userToSent = await prisma.user.findUnique({
          where: { id: chat.toUserId },
        });
        if (!userToSent) return;
        const newChat = await prisma.chat.create({
          data: {
            userId: authUser.id,
            message: chat.message,
            fromUserId: authUser.id,
            toUserId: userToSent.id,
            read: false,
          },
        });
        io.to([authUser.magicToken, userToSent.magicToken]).emit(
          '@chat:sent',
          newChat
        );
      });

      socket.on('disconnect', async () => {
        socket.leave(authUser.magicToken);
      });
    });
  });
};
