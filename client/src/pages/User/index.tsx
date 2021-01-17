import { FC, useEffect } from 'react';
import ChatWindow from '../../components/ChatWindow';
import SidePanel from '../../components/SidePanel';
import { useRoomStateValue } from '../../data/RoomStateProvider';
import { useUserStateValue } from '../../data/UserStateProvider';
import io from '../../socketio';
import { ActionTypes, RoomType } from '../../types';
import './User.scss';

const User: FC = () => {
  const [state, dispatch] = useRoomStateValue();
  const [{ user }] = useUserStateValue();

  useEffect(() => {
    io.emit('GET_ROOMS', { userId: user.id });

    io.on('FOUND_ROOMS', (rooms: RoomType[]) => {
      // if (rooms[0].master === user.id) return;

      dispatch({
        type: ActionTypes.SetRoom,
        payload: rooms,
      });
    });
  }, [user.id, dispatch]);

  const handleChatSelection = (id: string) => {
    dispatch({
      type: ActionTypes.SetSelectedChatRoom,
      payload: id,
    });
  };

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
