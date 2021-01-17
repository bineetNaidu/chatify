import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ChatWindowHeader.scss';

interface Props {
  roomName: string;
  roomStatus: string;
  roomAvatar: string;
}

const ChatWindowHeader: FC<Props> = ({ roomName, roomStatus, roomAvatar }) => {
  return (
    <div className="chatWindowHeader">
      <Avatar src={roomAvatar} alt={roomName} />

      <div className="chatWindowHeader__info">
        <h1>{roomName}</h1>
        <p>{roomStatus}</p>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
