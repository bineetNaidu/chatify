/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router, Request, Response } from 'express';
import Channel from '../../../models/Channel';

const r = Router();

r.post('/create', async (req: Request, res: Response) => {
  // eslint-disable-next-line object-curly-newline
  const { serverId, channelName, channelAdmin, invitee } = req.body;

  const channel = new Channel({
    serverId,
    channelName,
    channelAdmin,
    invitee,
  });
  await channel.save();

  res.status(201).json(channel);
});

export default r;
