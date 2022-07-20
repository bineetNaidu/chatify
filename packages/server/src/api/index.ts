import { Router } from 'express';
import { register, login, session } from '../controllers/auth';

const r = Router();

r.post('/auth/register', register);
r.post('/auth/login', login);
r.get('/auth/session', session);

export { r as apiRoutes };
