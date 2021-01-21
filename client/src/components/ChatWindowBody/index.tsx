import { FC, Fragment, useRef, useEffect } from 'react';
import { ChatType } from '../../types';
import ChatText from '../ChatText';
import { useUserStateValue } from '../../data/UserStateProvider';
import './ChatWindowBody.scss';

interface Props {
  chats: ChatType[];
}

const ChatWindowBody: FC<Props> = ({ chats }) => {
  const [{ user }] = useUserStateValue();
  const windowBtmView = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    windowBtmView.current?.scrollIntoView();
  }, []);

  return (
    <div className="ChatWindowBody">
      {chats.map((c) => (
        <Fragment key={c.id}>
          <ChatText
            me={c.senderId === user.id}
            text={c.text}
            timestamp={c.createdAt}
          />
        </Fragment>
      ))}
      <div ref={windowBtmView}></div>
    </div>
  );
};

export default ChatWindowBody;
