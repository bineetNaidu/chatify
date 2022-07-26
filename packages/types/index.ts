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
  magicToken: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ChatType = Base & {
  message: string;
  from?: UserType;
  fromUserId: number;
  to?: UserType;
  toUserId: number;
  read: boolean;
};

export type AuthErrorType = {
  message: string;
  field: string;
};

export type RegisterBodyType = Omit<
  UserType,
  'id' | 'createdAt' | 'updatedAt' | 'magicToken'
>;
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

type ListenEventsMap = {
  '@join': (user: UserType) => void;
  '@fetch:users': () => void;
  '@fetch:user': (id: number) => void;
  '@send:chat': (chat: Pick<ChatType, 'toUserId' | 'message'>) => void;
};

type EmitEventsMap = {
  '@joined': (message: 'OK' | 'FAILED', user?: UserType) => void;
  '@users:fetched': (users: UserType[]) => void;
  '@user:fetched': (user: UserType, chats: ChatType[]) => void;
  '@chat:sent': (chat: ChatType) => void;
};

export type ServerListenEventsMap = ListenEventsMap;
export type ServerEmitEventsMap = EmitEventsMap;
export type ClientListenEventsMap = EmitEventsMap;
export type ClientEmitEventsMap = ListenEventsMap;
