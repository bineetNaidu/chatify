import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ChatWindowHeader.scss';

interface Props {
  channelName: string;
  invitee: string;
}

const ChatWindowHeader: FC<Props> = ({ channelName, invitee }) => {
  return (
    <div className="chatWindowHeader">
      <Avatar />

      <div className="chatWindowHeader__info">
        <h1>{channelName}</h1>
        <p>{invitee}</p>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
