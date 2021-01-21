import { FC, useState, memo, useCallback } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import io from '../../socketio';
import { useUserStateValue } from '../../data/UserStateProvider';
import './ChatBar.scss';

type Props = {
  roomId: string;
  roomName: string;
  roomStatus: string;
  roomAvatar: string;
};

const ChatBar: FC<Props> = ({ roomName, roomStatus, roomAvatar, roomId }) => {
  const [{ user }] = useUserStateValue();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteRoom = useCallback(() => {
    console.log(user.id);
    io.emit('DELETE_ROOM', { userId: user.id, roomId });
  }, [user, roomId]);

  return (
    <div className="chatBar">
      <Avatar src={roomAvatar} alt={roomName} />
      <div className="chatBar__info">
        <h1>{roomName}</h1>
        <span>{roomStatus}</span>
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
          <MenuItem onClick={handleDeleteRoom}>Delete This Room</MenuItem>
          <MenuItem onClick={handleClose}>Block</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default memo(ChatBar);
