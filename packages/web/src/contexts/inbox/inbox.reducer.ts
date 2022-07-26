import { ActionType, IAction, IState } from './inbox.types';

export const initialState: IState = {
  inbox: [],
  selectedUserId: null,
};

export const inboxReducer = (state = initialState, action: IAction): IState => {
  switch (action.type) {
    case ActionType.SET_INBOX:
      return {
        ...state,
        inbox: action.payload,
      };

    case ActionType.SELECT_USER_ID:
      return {
        ...state,
        selectedUserId: action.payload.id,
      };

    default:
      return state;
  }
};
