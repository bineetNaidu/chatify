import { Request, Response } from 'express';
import { hash, verify } from 'argon2';
import { User } from '../entities/User';
import type {
  AuthLoginResponseType,
  RegisterBodyType,
  LoginBodyType,
  AuthRegisterResponseType,
} from '@chatify/types';
import jwt from 'jsonwebtoken';

export const register = async (
  req: Request<{}, {}, RegisterBodyType>,
  res: Response<AuthRegisterResponseType>
) => {
  const { username, password, email, avatar } = req.body;

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(400).json({
      error: [
        {
          field: 'email',
          message: 'User already exists with this email',
        },
      ],
    });
  }

  const user = await User.create({
    username,
    password: await hash(password),
    email,
    avatar,
  }).save();
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  return res.json({ user, token });
};

export const login = async (
  req: Request<{}, AuthLoginResponseType, LoginBodyType>,
  res: Response<AuthLoginResponseType>
) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (!user) {
    res
      .status(401)
      .json({ error: [{ message: 'Invalid email', field: 'email' }] });
    return;
  }
  const isValid = await verify(user.password, password);
  if (!isValid) {
    res.status(401).json({
      error: [{ message: 'Incorrect Credentials', field: 'password' }],
    });
    return;
  }
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1d',
  });
  res.status(200).json({ user, token });
};

export const session = async (
  req: Request<{}, User, {}>,
  res: Response<User | {}>
) => {
  const token = req.headers.authorization!.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
    userId: number;
  };

  const user = await User.findOne({
    where: {
      id: payload.userId,
    },
  });

  if (!user) {
    return res.status(401).json({ error: 'User not found' });
  }

  return res.json(user);
};
