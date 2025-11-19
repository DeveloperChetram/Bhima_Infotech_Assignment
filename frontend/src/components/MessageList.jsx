import { useContext, useEffect, useRef } from 'react';
import { ChatContext } from '../context/ChatContext.jsx';
import '../styles/MessageList.css';

function MessageList() {
  const { messages, userName } = useContext(ChatContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function formatTime(dateString) {
    const date = new Date(dateString);
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-messages">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((message) => {
          const isOwnMessage = message.user === userName;
          return (
            <div
              key={message._id}
              className={`message-item ${isOwnMessage ? 'own-message' : 'other-message'}`}
            >
              <div className="message-content">
                <div className="message-header">
                  <span className="message-user">{message.user}</span>
                  <span className="message-time">{formatTime(message.createdAt)}</span>
                </div>
                <div className="message-text">{message.message}</div>
              </div>
            </div>
          );
        })
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;

