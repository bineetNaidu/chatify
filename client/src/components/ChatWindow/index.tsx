import { FC } from 'react';
import ChatTextForm from '../ChatTextForm';
import ChatWindowBody from '../ChatWindowBody';
import ChatWindowHeader from '../ChatWindowHeader';
import './ChatWindow.scss';

const ChatWindow: FC = () => {
  return (
    <div className="chatWindow">
      <div className="chatWindow__header">
        <ChatWindowHeader />
      </div>
      <div className="chatWindow__body">
        <ChatWindowBody />
      </div>
      <div className="chatWindow__textInput">
        <ChatTextForm />
      </div>
    </div>
  );
};

export default ChatWindow;
