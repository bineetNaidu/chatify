import { UserType } from '@chatify/types';

export type IAuthState = {
  authUser: UserType | null;
  isAuthenticated: boolean;
};

export enum AuthActionType {
  SET_AUTH_USER = 'set:auth_user',
  RESET = 'reset',
}

export type IAuthAction =
  | {
      type: AuthActionType.SET_AUTH_USER;
      payload: UserType;
    }
  | {
      type: AuthActionType.RESET;
    };
