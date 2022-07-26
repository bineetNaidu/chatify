import type { UserType } from '@chatify/types';

export interface IState {
  inbox: UserType[];
  selectedUserId: number | null;
}

export enum ActionType {
  SET_INBOX = 'set:inbox',
  SELECT_USER_ID = 'select:user_id',
}

export interface IAction {
  type: ActionType;
  payload: any;
}
