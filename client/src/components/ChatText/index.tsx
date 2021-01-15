import { FC } from 'react';
import './ChatText.scss';

type Props = {
  text: string;
  timestamp: string;
  me: boolean;
};

const ChatText: FC<Props> = ({ me, text, timestamp }) => {
  return (
    <div className={`chatText ${me && 'me'}`}>
      <p className="chatText__text">{text}</p>
      <span className="chatText__date">
        {new Date(timestamp).toDateString()}
      </span>
    </div>
  );
};

export default ChatText;
