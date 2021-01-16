import { FC } from 'react';
import ChatWindow from '../../components/ChatWindow';
import SidePanel from '../../components/SidePanel';
import { useRoomStateValue } from '../../data/RoomStateProvider';
import './User.scss';

const User: FC = () => {
  const [state, dispatch] = useRoomStateValue();

  const handleChatSelection = (id: string) => {};

  return (
    <div className="userBoard">
      <div className="userBoard__sidepannel">
        <SidePanel handleChatSelection={handleChatSelection} />
      </div>

      <div className="userBoard__chatWindow">
        {state.selectedRoom ? (
          <ChatWindow {...state.selectedRoom} />
        ) : (
          <h1
            style={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            Welcome to Chatify
          </h1>
        )}
      </div>
    </div>
  );
};

export default User;
