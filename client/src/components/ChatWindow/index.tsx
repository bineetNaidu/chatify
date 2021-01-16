import { FC } from 'react';
import { SelectedChatType } from '../../pages/User';
import ChatTextForm from '../ChatTextForm';
import ChatWindowBody from '../ChatWindowBody';
import ChatWindowHeader from '../ChatWindowHeader';
import './ChatWindow.scss';

const ChatWindow: FC<SelectedChatType> = ({ channelName, chats, invitee }) => {
  return (
    <div className="chatWindow">
      <div className="chatWindow__header">
        <ChatWindowHeader channelName={channelName} invitee={invitee} />
      </div>
      <div className="chatWindow__body">
        <ChatWindowBody chats={chats} />
      </div>
      <div className="chatWindow__textInput">
        <ChatTextForm />
      </div>
    </div>
  );
};

export default ChatWindow;
