import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ChatWindowHeader.scss';

interface Props {
  roomName: string;
  roomStatus: string;
}

const ChatWindowHeader: FC<Props> = ({ roomName, roomStatus }) => {
  return (
    <div className="chatWindowHeader">
      <Avatar />

      <div className="chatWindowHeader__info">
        <h1>{roomName}</h1>
        <p>{roomStatus}</p>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
