import { FC, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { useUserStateValue } from '../../data/UserStateProvider';
import './CreateNewRoom.scss';
import io from '../../socketio';

type Props = {
  open: boolean;
  handleClose: () => void;
};

const CreateNewRoom: FC<Props> = ({ handleClose, open }) => {
  const [roomName, setRoomName] = useState('');
  const [roomAvatar, setRoomAvatar] = useState('');
  const [roomStatus, setRoomStatus] = useState('');
  const [invitee, setInvitee] = useState('');
  const [{ user }] = useUserStateValue();

  const handleSubmit = async () => {
    if (!user) {
      return alert('Please Signin');
    }
    if (roomAvatar && roomName && roomStatus && invitee) {
      const { data } = await axios.post(
        '/api/rooms/create',
        {
          roomName,
          roomAvatar,
          roomStatus,
          invitee,
        },
        {
          headers: {
            Authorization: `bearer ${user.id}`,
          },
        }
      );
      io.emit('ROOM_CREATED', data.data);
      handleClose();
    } else {
      alert('Please Fill out the required fields');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className="createNewRoom">
        <form
          className="createNewRoom__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <h2>Create a Room</h2>
          <TextField
            margin="normal"
            required
            label="Room Name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            label="Room Avatar"
            value={roomAvatar}
            onChange={(e) => setRoomAvatar(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            label="Room Status"
            value={roomStatus}
            onChange={(e) => setRoomStatus(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            label="Invite user's ID"
            value={invitee}
            onChange={(e) => setInvitee(e.target.value)}
            variant="outlined"
          />
          <Button type="submit" variant="contained" color="secondary">
            Create room!
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default CreateNewRoom;
// r
