import { FC } from 'react';
import './SidePanel.scss';

const SidePanel: FC = () => {
  return (
    <div className="sidePanel">
      <div className="sidePanel__header">{/* PanelHeader */}</div>
      <div className="sidePanel__chatBars">{/* PanelChatBar */}</div>
    </div>
  );
};

export default SidePanel;
