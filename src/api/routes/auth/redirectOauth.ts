import { Router, Response, Request } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/google/callback',
  passport.authenticate('google'),
  (req: Request, res: Response) => {
    res.json(req.user);
    // eslint-disable-next-line comma-dangle
  }
);

export default router;
