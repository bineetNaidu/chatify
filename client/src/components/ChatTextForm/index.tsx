import { FC, useState } from 'react';
import Button from '@material-ui/core/Button';
import { useRoomStateValue } from '../../data/RoomStateProvider';
import { useUserStateValue } from '../../data/UserStateProvider';
import io from '../../socketio';
import './ChatTextForm.scss';

const ChatTextForm: FC = () => {
  const [text, setText] = useState('');
  const [{ selectedRoom }] = useRoomStateValue();
  const [{ user }] = useUserStateValue();

  const handleCreateChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    io.emit('CREATE_CHAT', {
      userId: user.id,
      roomId: selectedRoom.id,
      text,
      senderId: user.id,
    });
  };

  return (
    <form className="chatTextForm" onSubmit={handleCreateChat}>
      <input
        className="chatTextForm__input"
        placeholder="Message....."
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        variant="contained"
        color="secondary"
        className="chatTextForm__btn"
        type="submit"
      >
        Send
      </Button>
    </form>
  );
};

export default ChatTextForm;
