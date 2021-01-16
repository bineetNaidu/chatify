import { Action, ActionTypes, UserType } from '../../types';

type UserState = {
  user: UserType | null;
};

export const intialUserState: UserState = {
  user: null,
};

const reducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SetUser:
      return {
        user: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
