import 'express-async-errors';
import 'reflect-metadata';
import app from './app';
import http from 'http';
import { ___prod___ } from './utils/contants';
import { ioObserver } from './lib/io';
import { Server } from 'socket.io';
import type { DefaultEventsMap } from 'socket.io/dist/typed-events';
import type {
  ServerEmitEventsMap,
  ServerListenEventsMap,
} from '@chatify/types';

(async () => {
  try {
    const server = http.createServer(app);

    const ioInstance = new Server<
      ServerListenEventsMap,
      ServerEmitEventsMap,
      DefaultEventsMap,
      {}
    >(server, {
      cors: { origin: '*' },
    });

    ioObserver(ioInstance);

    const port = process.env.PORT || 4242;
    server.listen(port, () => {
      console.log(`~~~~ Server Started ~~~~`);
      if (!___prod___) {
        console.log(`**** VISIT: http://localhost:${port} ****`);
      }
    });
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
