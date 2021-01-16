import { FC, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBar from '../ChatBar';
import { useStateValue } from '../../data/StateProvider';
import './SidePanel.scss';
import { Channel } from '../../types';

interface Props {
  handleChatSelection(id: string): void;
}

const SidePanel: FC<Props> = ({ handleChatSelection }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [state] = useStateValue();

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
        {state.channels.map((c: Channel) => (
          <div
            key={(c as any)._id}
            onClick={() => handleChatSelection((c as any)._id)}
          >
            <ChatBar channelName={c.channelName} invitee={c.invitee} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SidePanel;
