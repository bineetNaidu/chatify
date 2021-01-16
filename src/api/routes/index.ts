import { Router } from 'express';
import signinOauthRoute from './auth/signinOauth';
import redirectOauthRoute from './auth/redirectOauth';
import createRoomRoute from './rooms/create';

const RootAPIRoutes = Router();

// ? Auth Service
RootAPIRoutes.use('/auth', signinOauthRoute);
RootAPIRoutes.use('/auth', redirectOauthRoute);

// ? Rooms Service
RootAPIRoutes.use('/rooms', createRoomRoute);

export default RootAPIRoutes;
