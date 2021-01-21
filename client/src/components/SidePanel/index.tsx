import { FC, useState, useCallback, memo } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatBar from '../ChatBar';
import { useRoomStateValue } from '../../data/RoomStateProvider';
import { useUserStateValue } from '../../data/UserStateProvider';
import './SidePanel.scss';
import { RoomType } from '../../types';
import CreateNewRoom from '../CreateNewRoom';

interface Props {
  handleChatSelection(id: string): void;
}

const SidePanel: FC<Props> = ({ handleChatSelection }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [{ rooms }] = useRoomStateValue();
  const [{ user }] = useUserStateValue();
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="sidePanel">
      <div className="sidePanel__header">
        <Avatar src={user.avatar} alt={user.name} />
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
        <button
          type="button"
          className="sidePanel__chatBars__createBtn"
          onClick={handleOpen}
        >
          Create new Room
        </button>
        <CreateNewRoom open={open} handleClose={handleCloseModal} />
        {rooms &&
          rooms.map((room: RoomType) => (
            <div key={room.id} onClick={() => handleChatSelection(room.id)}>
              <ChatBar
                roomId={room.id}
                roomAvatar={room.roomAvatar}
                roomName={room.roomName}
                roomStatus={room.roomStatus}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(SidePanel);
