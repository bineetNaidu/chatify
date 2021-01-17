export type UserType = {
  id: string;
  name: string;
  avatar?: string;
  googleId: string;
  status?: string;
  isAdmin: boolean;
  online: boolean;
  blockedLists: string[];
  rooms: string[];
};

export type ChatType = {
  senderId: string;
  text: string;
  timestamps?: Date;
  created_at: Date;
  id: string;
};

export type RoomType = {
  roomName: string;
  roomAvatar: string;
  id: string;
  roomStatus: string;
  master: string;
  invitee: string;
  chats: ChatType[];
};

export enum ActionTypes {
  SetUser = 'SET_USER',
  SetRoom = 'SET_ROOM',
  AddChat = 'ADD_CHAT',
  SetSelectedChatRoom = 'SET_SELECTED_CHAT_ROOM',
  AddRoom = 'ADD_ROOM',
}

export enum SocketIOEvents {}

export type Action = {
  type: ActionTypes;
  payload?: any;
};
