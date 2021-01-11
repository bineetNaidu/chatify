/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import signinOauthRoute from './auth/signinOauth';
import redirectOauthRoute from './auth/redirectOauth';
import createServerRoute from './servers/create';
import findServerRoute from './servers/find';
import createChannelRoute from './channels/create';
// TODO: routes for "Chats" service

const RootAPIRoutes = Router();

// ? Auth Service
RootAPIRoutes.use('/auth', signinOauthRoute);
RootAPIRoutes.use('/auth', redirectOauthRoute);
RootAPIRoutes.use('/server', createServerRoute);
RootAPIRoutes.use('/server', findServerRoute);
RootAPIRoutes.use('/channel', createChannelRoute);

export default RootAPIRoutes;
