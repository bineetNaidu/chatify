/* eslint-disable comma-dangle */
/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import logger from 'morgan';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import 'express-async-errors';
import * as socketio from 'socket.io';
import User from './models/User';
import ConnectDB from './configs/database';
import RootAPIRoutes from './api/routes';

dotenv.config();
const DEV = process.env.NODE_ENV !== 'production';

passport.serializeUser((user: any, done: any) => {
  done(null, user.id);
});

passport.deserializeUser((id: any, done: any) => {
  User.findById(id).then((user: any) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: '/api/auth/google/callback',
    },
    (accessToken: any, refreshToken: any, profile: any, done: any) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then((currentUser: any) => {
        if (currentUser) {
          // ? already have this user
          console.log('user is: ', currentUser);
          done(null, currentUser);
        } else {
          // ? if not, create user in our db
          new User({
            googleId: profile.id,
            name: profile.displayName,
          })
            .save()
            .then((newUser: any) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
        }
      });
    }
  )
);

const app = express();
const server = new http.Server(app);
const io = new socketio.Server(server);

ConnectDB();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(helmet());
// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// ? Socket IO
io.on('connection', (data) => {
  console.log('>> USER CONNECTED');
});

// ? /

app.use('/api', RootAPIRoutes);

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
