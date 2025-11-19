import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext.jsx';
import '../styles/MessageInput.css';

function MessageInput() {
  const { sendMessage } = useContext(ChatContext);
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  }

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="message-input"
      />
      <button type="submit" className="send-button">
        Send
      </button>
    </form>
  );
}

export default MessageInput;

