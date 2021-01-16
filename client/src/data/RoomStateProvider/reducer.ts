import { Action, ActionTypes, RoomType } from '../../types';

type RoomsState = {
  rooms: RoomType[] | null;
  selectedRoom?: RoomType;
};

export const initialRoomState: RoomsState = {
  rooms: null,
  selectedRoom: undefined,
};

const reducer = (state: RoomsState, action: Action): RoomsState => {
  switch (action.type) {
    case ActionTypes.SetRoom:
      return {
        ...state,
        rooms: action.payload,
      };

    case ActionTypes.AddChat:
      const foundChatRoom = state.rooms?.find(
        (r) => r.id === action.payload.id
      );
      foundChatRoom?.chats.push(action.payload.chat);

      return {
        ...state,
        rooms: [...state.rooms!, foundChatRoom!],
      };

    case ActionTypes.SetSelectedChatRoom:
      return {
        ...state,
        selectedRoom: state.rooms?.find((r) => r.id === action.payload),
      };

    default:
      return state;
  }
};

export default reducer;
