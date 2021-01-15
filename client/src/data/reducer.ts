import { Action, ActionTypes, State } from '../types';

export const initialState: State = {
  user: null,
  online: false,
  channels: [],
  server: null,
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SetServer:
      return {
        ...state,
        server: action.payload,
      };

    case ActionTypes.SetOnline:
      return {
        ...state,
        online: action.payload.online,
      };

    case ActionTypes.SetUser:
      return {
        ...state,
        user: action.payload,
      };

    case ActionTypes.SetChannel:
      return {
        ...state,
        channels: action.payload,
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
