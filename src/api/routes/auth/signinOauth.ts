import { Router, Response, Request } from 'express';
import User from '../../../models/User';

const router = Router();

router.post(
  '/google',
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response): Promise<any> => {
    // eslint-disable-next-line object-curly-newline
    const { googleId, name, avatar, status, online } = req.body;

    const userExist = await User.findOne({ googleId });

    if (userExist) {
      return res.status(200).json(userExist);
    }

    const user = new User({
      name,
      avatar,
      googleId,
      status,
      online,
      blockedLists: [],
      rooms: [],
    });

    await user.save();
    res.status(201).json(user);
    // eslint-disable-next-line comma-dangle
  }
);

export default router;
