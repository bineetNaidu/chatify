import { FC } from 'react';
import './User.scss';

const User: FC = () => {
  return (
    <div className="userBoard">
      <div className="userBoard__sidepannel">{/* Side Pannel */}</div>

      <div className="userBoard__chatWindow">{/* Chat Window */}</div>
    </div>
  );
};

export default User;
