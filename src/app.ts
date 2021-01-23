/* eslint-disable comma-dangle */
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import logger from 'morgan';
import 'express-async-errors';
import * as socketio from 'socket.io';
import ConnectDB from './configs/database';
import RootAPIRoutes from './api/routes';
import SocketIOServerConnection from './SocketIO';

dotenv.config();
const DEV = process.env.NODE_ENV !== 'production';

const app = express();
const server = new http.Server(app);
const io = new socketio.Server(server);

ConnectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());

// ? Socket IO
SocketIOServerConnection(io);
// ? /

app.use('/api', RootAPIRoutes);

// Serve static assets if in production
if (!DEV) {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../', 'client', 'build', 'index.html'));
  });
}

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('..........Server Listening.........');
});
