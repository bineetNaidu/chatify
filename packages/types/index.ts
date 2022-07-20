export type UserType = {
  username: string;
  password: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
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
