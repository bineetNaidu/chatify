/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import { Router, Request, Response } from 'express';
import Server from '../../../models/Server';

const r = Router();

r.post('/create', async (req: Request, res: Response) => {
  const { serverName, serverAdmin } = req.body;

  const server = new Server({
    serverName,
    serverAdmin,
  });
  await server.save();

  res.status(201).json(server);
});

export default r;
