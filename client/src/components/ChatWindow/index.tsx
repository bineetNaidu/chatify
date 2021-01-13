import { FC } from 'react';
import ChatWindowHeader from '../ChatWindowHeader';
import './ChatWindow.scss';

const ChatWindow: FC = () => {
  return (
    <div className="chatWindow">
      <div className="chatWindow__header">
        <ChatWindowHeader />
      </div>
      {/* ChatWindowHeader */}
      {/* ChatWindowBody */}
      {/* ChatWindow Text Imput Form */}
    </div>
  );
};

export default ChatWindow;
