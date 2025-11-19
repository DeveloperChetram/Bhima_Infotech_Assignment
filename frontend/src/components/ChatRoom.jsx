import { useContext, useState } from 'react';
import { ChatContext } from '../context/ChatContext.jsx';
import MessageList from './MessageList.jsx';
import MessageInput from './MessageInput.jsx';
import '../styles/ChatRoom.css';

function ChatRoom() {
  const { currentRoom, userName, isConnected, leaveRoom, joinRoom } = useContext(ChatContext);
  const [showJoinForm, setShowJoinForm] = useState(true);
  const [name, setName] = useState('');
  const DEFAULT_ROOM = 'general';

  function handleJoin(e) {
    if (e) {
      e.preventDefault();
    }
    if (name.trim()) {
      joinRoom(DEFAULT_ROOM, name.trim());
      setShowJoinForm(false);
    }
  }

  function handleLeave() {
    leaveRoom();
    setShowJoinForm(true);
    setName('');
  }

  if (showJoinForm) {
    return (
      <div className="join-container">
        <div className="join-card">
          <h2>Join Default Room</h2>
          <div className="form-group">
            <label>Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleJoin(e)}
              placeholder="Enter your name"
            />
          </div>
          <button onClick={handleJoin} className="join-button">
            Join Default Room
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="room-info">
          <h2>{currentRoom}</h2>
          <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
        <div className="user-info">
          <span>Hello, {userName}</span>
          <button onClick={handleLeave} className="leave-button">
            Leave Room
          </button>
        </div>
      </div>
      <MessageList />
      <MessageInput />
    </div>
  );
}

export default ChatRoom;

