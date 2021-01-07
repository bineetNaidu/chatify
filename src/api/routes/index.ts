import { Router } from 'express';
// TODO: routes for "Auth" service
// TODO: routes for "Servers" service
// TODO: routes for "Channels" service
// TODO: routes for "Chats" service

const RootAPIRoutes = Router();

RootAPIRoutes.get('/api', (req, res) => res.send('Hello'));

export default RootAPIRoutes;
