/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router, Request, Response } from 'express';
import Server from '../../../models/Server';

const r = Router();

r.get('/:userId', async (req: Request, res: Response) => {
  const server = await Server.findOne({
    serverAdmin: req.params.userId,
  })
    .populate('channels')
    .populate('members')
    .exec();
  if (!server) {
    throw new Error('Server Not Found By the Authorized User');
  }
  res.json(server);
});

export default r;
