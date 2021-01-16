import { Router } from 'express';
import signinOauthRoute from './auth/signinOauth';
import redirectOauthRoute from './auth/redirectOauth';

const RootAPIRoutes = Router();

// ? Auth Service
RootAPIRoutes.use('/auth', signinOauthRoute);
RootAPIRoutes.use('/auth', redirectOauthRoute);

export default RootAPIRoutes;
