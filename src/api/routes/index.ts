import { Router } from 'express';
import signinOauthRoute from './auth/signinOauth';
import createRoomRoute from './rooms/create';

const RootAPIRoutes = Router();

// ? Auth Service
RootAPIRoutes.use('/auth', signinOauthRoute);

// ? Rooms Service
RootAPIRoutes.use('/rooms', createRoomRoute);

export default RootAPIRoutes;
