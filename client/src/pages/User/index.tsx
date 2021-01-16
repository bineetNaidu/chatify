import { FC, useState } from 'react';
import ChatWindow from '../../components/ChatWindow';
import SidePanel from '../../components/SidePanel';
import io from '../../socketio';
import { Channel, Chat } from '../../types';
import './User.scss';

export type SelectedChatType = {
  channelName: string;
  invitee: string;
  chats: Chat[];
};

const User: FC = () => {
  const [selectedChat, setSelectedChat] = useState<SelectedChatType | null>(
    null
  );

  io.on('FOUND_CHANNEL', (channel: Channel) => {
    setSelectedChat(channel);
  });

  const handleChatSelection = (id: string) => {
    io.emit('GET_CHANNEL', { id });
  };

  return (
    <div className="userBoard">
      <div className="userBoard__sidepannel">
        <SidePanel handleChatSelection={handleChatSelection} />
      </div>

      <div className="userBoard__chatWindow">
        {selectedChat ? (
          <ChatWindow {...selectedChat} /> //? see SelectedChatType interface
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
