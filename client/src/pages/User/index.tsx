import { FC, useCallback, useEffect } from 'react';
import ChatWindow from '../../components/ChatWindow';
import SidePanel from '../../components/SidePanel';
import { useRoomStateValue } from '../../data/RoomStateProvider';
import { useUserStateValue } from '../../data/UserStateProvider';
import io from '../../socketio';
import { ActionTypes, RoomType } from '../../types';
import './User.scss';

const User: FC = () => {
  const [roomState, dispatch] = useRoomStateValue();
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

    // TODO Fix State Null Issue
    // io.on('CHAT_DELIVERED', (data: { roomId: string; room: RoomType }) => {
    //   console.log('DATA > ', data);
    //   console.log('STATE_ROOM > ', roomState);

    //   // const foundRoom = rooms.find((r: { id: string }) => r.id === roomId);
    //   // if (foundRoom) {
    //   //   dispatch({
    //   //     type: ActionTypes.AddChat,
    //   //     payload: { chat: room.chats },
    //   //   });
    //   // }
    // });
  }, [user.id, dispatch]);

  const handleChatSelection = useCallback(
    (id: string) => {
      dispatch({
        type: ActionTypes.SetSelectedChatRoom,
        payload: id,
      });
    },
    [roomState.selectedRoom]
  );

  return (
    <div className="userBoard">
      <div className="userBoard__sidepannel">
        <SidePanel handleChatSelection={handleChatSelection} />
      </div>

      <div className="userBoard__chatWindow">
        {roomState.selectedRoom ? (
          <ChatWindow {...roomState.selectedRoom} />
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
