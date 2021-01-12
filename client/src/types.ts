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
