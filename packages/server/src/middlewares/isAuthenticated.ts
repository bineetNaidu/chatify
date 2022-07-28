import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const isAuthenticated = (
  req: Request<{}, {}, {}>,
  _res: Response<{}>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('No token provided');
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    throw new Error('No token provided');
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: number;
    };
    next();
  } catch (error) {
    next(error);
  }
};
