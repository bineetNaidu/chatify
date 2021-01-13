import { FC } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './SidePanel.scss';

const SidePanel: FC = () => {
  return (
    <div className="sidePanel">
      <div className="sidePanel__header">
        <Avatar
          src="https://avatars0.githubusercontent.com/u/66471461?v=4"
          alt="Bineet"
        />
        <IconButton color="secondary">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="sidePanel__chatBars">{/* PanelChatBar */}</div>
    </div>
  );
};

export default SidePanel;
