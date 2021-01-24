import { Router, Response, Request } from 'express';
import User from '../../../models/User';

const router = Router();

router.post(
  '/google',
  // eslint-disable-next-line consistent-return
  async (req: Request, res: Response): Promise<any> => {
    const { googleId, name, avatar } = req.body;

    const userExist = await User.findOne({ googleId });

    if (userExist) {
      return res.status(200).json(userExist);
    }

    const user = new User({
      name,
      avatar,
      googleId,
      online: true,
      blockedLists: [],
      rooms: [],
    });

    await user.save();
    res.status(201).json(user);
    // eslint-disable-next-line comma-dangle
  }
);

export default router;
