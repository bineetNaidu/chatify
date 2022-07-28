import { AuthActionType, IAuthAction, IAuthState } from './auth.types';

export const initialAuthState: IAuthState = {
  authUser: null,
  isAuthenticated: false,
};

export const authReducer = (
  state = initialAuthState,
  action: IAuthAction
): IAuthState => {
  switch (action.type) {
    case AuthActionType.SET_AUTH_USER:
      return {
        authUser: action.payload,
        isAuthenticated: true,
      };

    case AuthActionType.RESET:
      return {
        authUser: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};
