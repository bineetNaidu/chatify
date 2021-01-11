/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router, Response, Request } from 'express';
import Channel from '../../../models/Channel';
import Chat from '../../../models/Chat';

const r = Router();

r.post('/create', async (req: Request, res: Response) => {
  const { channelId, text, senderId } = req.body;

  const channel = await Channel.findById(channelId);
  if (!channel) throw new Error('Channel Not Found');

  const chat = new Chat({ channelId, text, senderId });
  await chat.save();

  channel.chats.push(chat.id);
  await channel.save();

  res.status(201).json(chat);
});

export default r;
