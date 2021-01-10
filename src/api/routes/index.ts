/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import signinOauthRoute from './auth/signinOauth';
import redirectOauthRoute from './auth/redirectOauth';
// TODO: routes for "Servers" service
// TODO: routes for "Channels" service
// TODO: routes for "Chats" service

const RootAPIRoutes = Router();

// ? Auth Service
RootAPIRoutes.use('/auth', signinOauthRoute);
RootAPIRoutes.use('/auth', redirectOauthRoute);

export default RootAPIRoutes;
