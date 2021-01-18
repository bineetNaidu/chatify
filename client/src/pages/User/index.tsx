import { FC, useEffect } from 'react';
import ChatWindow from '../../components/ChatWindow';
import SidePanel from '../../components/SidePanel';
import { useRoomStateValue } from '../../data/RoomStateProvider';
import { useUserStateValue } from '../../data/UserStateProvider';
import io from '../../socketio';
import { ActionTypes, RoomType } from '../../types';
import './User.scss';

const User: FC = () => {
  const [{ selectedRoom, rooms }, dispatch] = useRoomStateValue();
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

    io.on('ROOM_CREATED', (room: RoomType) => {
      if (room.master === user.id) {
        dispatch({
          type: ActionTypes.AddRoom,
          payload: room,
        });
      }
    });

    io.on('ROOM_DELETED', (data: { userId: string; data: RoomType[] }) => {
      if (data.userId === user.id) {
        dispatch({
          type: ActionTypes.SetRoom,
          payload: data.data,
        });
      }
    });

    io.on('CHAT_DELIVERED', (data: { roomId: any; room: RoomType }) => {
      const { roomId, room } = data;
      console.log(room);
      const foundRoom = (rooms as RoomType[]).find((r) => r.id === roomId);
      if (foundRoom) {
        dispatch({
          type: ActionTypes.AddChat,
          payload: { chat: room.chats },
        });
      }
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
        {selectedRoom ? (
          <ChatWindow {...selectedRoom} />
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
