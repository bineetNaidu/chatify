/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router, Request, Response } from 'express';
import Channel from '../../../models/Channel';
import Server from '../../../models/Server';

const r = Router();

r.post('/create', async (req: Request, res: Response) => {
  // eslint-disable-next-line object-curly-newline
  const { serverId, channelName, channelAdmin, invitee } = req.body;

  const server = await Server.findById(serverId);
  if (!server) {
    throw new Error('Server Not Found By the Authorized User');
  }

  const channel = new Channel({
    serverId,
    channelName,
    channelAdmin,
    invitee,
  });
  await channel.save();

  const { _id } = channel;
  server.channels.push(_id);
  await server.save();

  res.status(201).json(channel);
});

export default r;
