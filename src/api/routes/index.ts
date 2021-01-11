/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router } from 'express';
import signinOauthRoute from './auth/signinOauth';
import redirectOauthRoute from './auth/redirectOauth';
import createServerRoute from './servers/create';
import findServerRoute from './servers/find';
import createChannelRoute from './channels/create';
import findChannelRoute from './channels/find';
import createChatRoute from './chats/create';

const RootAPIRoutes = Router();

// ? Auth Service
RootAPIRoutes.use('/auth', signinOauthRoute);
RootAPIRoutes.use('/auth', redirectOauthRoute);
RootAPIRoutes.use('/server', createServerRoute);
RootAPIRoutes.use('/server', findServerRoute);
RootAPIRoutes.use('/channel', createChannelRoute);
RootAPIRoutes.use('/channel', findChannelRoute);
RootAPIRoutes.use('/chats', createChatRoute);

export default RootAPIRoutes;
