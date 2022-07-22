export type Base = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
};

export type UserType = Base & {
  username: string;
  password: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
};

export type MessageType = Base & {
  body: string;
  author: UserType;
};

export type ChannelType = Base & {
  name: string;
  avatar?: string;
  participants: UserType[];
  messages: MessageType[];
};

export type AuthErrorType = {
  message: string;
  field: string;
};

export type RegisterBodyType = Omit<UserType, 'id' | 'createdAt' | 'updatedAt'>;
export type LoginBodyType = Pick<UserType, 'email' | 'password'>;

export type AuthRegisterResponseType = {
  user?: Omit<UserType, 'password'>;
  token?: string;
  error?: AuthErrorType[];
};

export type AuthLoginResponseType = {
  user?: Omit<UserType, 'password'>;
  token?: string;
  error?: AuthErrorType[];
};
