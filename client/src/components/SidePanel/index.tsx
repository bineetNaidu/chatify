import { FC, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBar from '../ChatBar';
import './SidePanel.scss';

const SidePanel: FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="sidePanel">
      <div className="sidePanel__header">
        <Avatar
          src="https://avatars0.githubusercontent.com/u/66471461?v=4"
          alt="Bineet"
        />
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
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </div>
      <div className="sidePanel__chatBars">
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
        <ChatBar />
      </div>
    </div>
  );
};

export default SidePanel;