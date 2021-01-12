import { State } from '../types';

export const initialState: State = {
  user: null,
  online: false,
  channels: [],
};

enum ActionTypes {
  SetUser = 'SET_USER',
  SetOnline = 'SET_ONLINE',
  AddChatInChannel = 'ADD_CHAT_IN_CHANNEL',
  AddChannel = 'ADD_CHANNEL',
  RemoveChannel = 'REMOVE_CHANNEL',
}

interface Action {
  payload?: any;
  type: ActionTypes;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SetOnline:
      return {
        ...state,
        online: !state.online,
      };

    case ActionTypes.SetUser:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.AddChannel:
      return {
        ...state,
        channels: [...state.channels, action.payload],
      };

    case ActionTypes.RemoveChannel:
      // Action.payload will expect an ID only

      return {
        ...state,
        channels: state.channels.filter((c) => c.id !== action.payload.id),
      };

    default:
      return state;
  }
};

export default reducer;
