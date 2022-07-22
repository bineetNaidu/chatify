import { ActionType, IAction, IState } from './channels.types';

export const initialState: IState = {
  channels: [],
};

export const channelReducer = (
  state = initialState,
  action: IAction
): IState => {
  switch (action.type) {
    case ActionType.SET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
      };
    case ActionType.CREATE_CHANNEL:
      return {
        channels: [...state.channels, action.payload],
      };

    case ActionType.REMOVE_CHANNEL:
      return {
        channels: state.channels.filter((c) => c.id !== action.payload.id),
      };

    case ActionType.ADD_PARTICIPANT:
      return {
        channels: state.channels.map((c) => {
          if (c.id === action.payload.channelId) {
            c.participants.push(action.payload.participant);
            return c;
          }
          return c;
        }),
      };

    case ActionType.SEND_MSG:
      return {
        channels: state.channels.map((c) => {
          if (c.id === action.payload.channelId) {
            c.messages.push(action.payload.message);
            return c;
          }
          return c;
        }),
      };

    case ActionType.DELETE_MSG:
      return {
        channels: state.channels.map((c) => {
          if (c.id === action.payload.channelId) {
            c.messages = c.messages.filter(
              (m) => m.id !== action.payload.message.id
            );
            return c;
          }
          return c;
        }),
      };

    default:
      return state;
  }
};
