import type { ChannelType } from '@chatify/types';

export interface IState {
  channels: ChannelType[];
}

export enum ActionType {
  SET_CHANNELS = 'SET_CHANNELS',
  CREATE_CHANNEL = 'create:channel',
  ADD_PARTICIPANT = 'add:participants',
  REMOVE_CHANNEL = 'remove:channel',
  SEND_MSG = 'send:message',
  DELETE_MSG = 'delete:message',
}

export interface IAction {
  type: ActionType;
  payload: any;
}
