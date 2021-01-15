import { FC } from 'react';
import './ChatTextForm.scss';

const ChatTextForm: FC = () => {
  return (
    <form className="chatTextForm" onSubmit={(e) => e.preventDefault()}>
      <input type="text" className="chatTextForm__input" />
      <button type="submit" className="chatTextForm__btn">
        Send
      </button>
    </form>
  );
};

export default ChatTextForm;
