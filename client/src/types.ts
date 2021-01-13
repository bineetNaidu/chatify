export interface User {
  name: string;
  id: string;
}

export enum ServerVisibility {
  Public = 'public',
  Private = 'private',
}

export interface Server {
  serverName: string;
  serverAdmin: string;
  members?: string[];
  channels: Channel[];
  visibility: ServerVisibility;
}

export interface Chat {
  id: string;
  channelId: string;
  text: string;
  senderId: string;
  timestamp: Date;
}

export interface Channel {
  id: string;
  serverId: string;
  channelName: string;
  channelAdmin: string;
  invitee: string;
  chats: Chat[];
  channelAvatar: string;
}

export interface State {
  user: User | null;
  currentChatWindow?: string;
  online: boolean;
  server?: Server;
  channels: Channel[];
}

export enum ActionTypes {
  SetUser = 'SET_USER',
  SetOnline = 'SET_ONLINE',
  AddChatInChannel = 'ADD_CHAT_IN_CHANNEL',
  AddChannel = 'ADD_CHANNEL',
  RemoveChannel = 'REMOVE_CHANNEL',
}

export interface Action {
  payload?: any;
  type: ActionTypes;
}
