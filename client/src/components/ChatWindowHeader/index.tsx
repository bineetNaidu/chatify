import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import './ChatWindowHeader.scss';

const ChatWindowHeader: FC = () => {
  return (
    <div className="chatWindowHeader">
      <Avatar />

      <div className="chatWindowHeader__info">
        <h1>Channel Name</h1>
        <p>Channel Desc.....</p>
      </div>
    </div>
  );
};

export default ChatWindowHeader;
