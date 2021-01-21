import { FC, memo } from 'react';
import { RoomType } from '../../types';
import ChatTextForm from '../ChatTextForm';
import ChatWindowBody from '../ChatWindowBody';
import ChatWindowHeader from '../ChatWindowHeader';
import './ChatWindow.scss';

const ChatWindow: FC<RoomType> = ({
  roomName,
  roomStatus,
  chats,
  roomAvatar,
}) => {
  return (
    <div className="chatWindow">
      <div className="chatWindow__header">
        <ChatWindowHeader
          roomAvatar={roomAvatar}
          roomName={roomName}
          roomStatus={roomStatus}
        />
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

export default memo(ChatWindow);
