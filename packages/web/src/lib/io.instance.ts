import { connect, Socket } from 'socket.io-client';
import type {
  ClientEmitEventsMap,
  ClientListenEventsMap,
} from '@chatify/types';

export const io: Socket<ClientListenEventsMap, ClientEmitEventsMap> = connect(
  'http://localhost:4242',
  {
    auth: {
      token: localStorage.getItem('chatify:token'),
    },
  }
);
