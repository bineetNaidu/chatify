import { FC } from 'react';
import ChatText from '../ChatText';
import './ChatWindowBody.scss';

const ChatWindowBody: FC = () => {
  return (
    <div className="ChatWindowBody">
      <ChatText me text="Hi" timestamp={new Date().toString()} />
      <ChatText me text="Holla" timestamp={new Date().toString()} />
      <ChatText me={false} text="Hi GUys" timestamp={new Date().toString()} />
      <ChatText me text="Hi" timestamp={new Date().toString()} />
    </div>
  );
};

export default ChatWindowBody;
