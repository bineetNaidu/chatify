import { FC } from 'react';
import { Chat } from '../../types';
import ChatText from '../ChatText';
import './ChatWindowBody.scss';

interface Props {
  chats: Chat[];
}

const ChatWindowBody: FC<Props> = ({ chats }) => {
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
