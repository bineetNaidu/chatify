/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router, Request, Response } from 'express';
import Channel from '../../../models/Channel';

const r = Router();

r.get('/:serverId/:userId', async (req: Request, res: Response) => {
  const channel = await Channel.findOne({
    channelAdmin: req.params.userId,
    serverId: req.params.serverId,
  })
    .populate('chats')
    .populate('invitee');

  if (!channel) {
    throw new Error('Channel not Found');
  }

  res.json(channel);
});

export default r;
