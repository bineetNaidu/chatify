import { FC, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './ChatBar.scss';

type Props = {
  channelName: string;
  invitee: string;
};

const ChatBar: FC<Props> = ({ channelName, invitee }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="chatBar">
      <Avatar />
      <div className="chatBar__info">
        <h1>{channelName}</h1>
        <span>{invitee}</span>
      </div>

      <div className="chatBar__ctx">
        <IconButton color="secondary" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Delete The Channels Chats</MenuItem>
          <MenuItem onClick={handleClose}>Block</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default ChatBar;
