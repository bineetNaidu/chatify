/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import ConnectDB from './configs/database';

dotenv.config();
const DEV = process.env.NODE_ENV !== 'production';

const app = express();
const server = http.createServer(app);

ConnectDB();

app.use(cors());
app.use(helmet());

app.get('/', (req, res) => {
  res.json({
    hello: 'World',
  });
});

// Serve static assets if in production
if (!DEV) {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('client', 'build', 'index.html'));
  });
}

server.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('..........Server Listening.........');
});
