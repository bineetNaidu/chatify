import { Router, Request, Response } from 'express';
import Room from '../../../models/Room';
import User from '../../../models/User';

const router = Router();

router.post('/create', async (req: Request, res: Response) => {
  // eslint-disable-next-line object-curly-newline
  const { roomName, roomAvatar, roomStatus, invitee } = req.body;
  const foundInvitee = await User.findById(invitee);
  if (!foundInvitee) return;
  const currentUserId = req.headers.authorization?.split(' ')[1];
  const foundCurrentUser = await User.findById(currentUserId);

  const room = new Room({
    roomName,
    roomAvatar,
    roomStatus,
    invitee: foundInvitee.id,
    master: foundCurrentUser!.id,
  });
  await room.save();

  foundCurrentUser?.rooms.push(room.id);
  await foundCurrentUser?.save();

  foundInvitee?.rooms.push(room.id);
  await foundInvitee.save();

  res.status(201).json({
    success: true,
    data: room,
  });
});

export default router;
