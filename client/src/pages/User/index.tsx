import { FC } from 'react';
import SidePanel from '../../components/SidePanel';
import './User.scss';

const User: FC = () => {
  return (
    <div className="userBoard">
      <div className="userBoard__sidepannel">
        <SidePanel />
      </div>

      <div className="userBoard__chatWindow">{/* Chat Window */}</div>
    </div>
  );
};

export default User;
