import { FC, Fragment } from 'react';
import { ChatType } from '../../types';
import ChatText from '../ChatText';
import { useUserStateValue } from '../../data/UserStateProvider';
import './ChatWindowBody.scss';

interface Props {
  chats: ChatType[];
}

const ChatWindowBody: FC<Props> = ({ chats }) => {
  const [{ user }] = useUserStateValue();

  return (
    <div className="ChatWindowBody">
      {chats.map((c) => (
        <Fragment key={c.id}>
          <ChatText
            me={c.senderId === user.id}
            text="Hi"
            timestamp={(c as any).createdAt}
          />
        </Fragment>
      ))}
    </div>
  );
};

export default ChatWindowBody;
