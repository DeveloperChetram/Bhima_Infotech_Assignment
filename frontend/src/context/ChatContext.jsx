import { createContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { getMessages } from '../api/api.jsx';

export const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('receive-message', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on('room-joined', (data) => {
      loadMessages(data.room);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  function loadMessages(room) {
    getMessages(room)
      .then((response) => {
        if (response.data.success) {
          setMessages(response.data.data.messages);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function joinRoom(room, name) {
    if (socket && room && name) {
      socket.emit('join-room', room);
      setCurrentRoom(room);
      setUserName(name);
      loadMessages(room);
    }
  }

  function sendMessage(message) {
    if (socket && currentRoom && userName && message) {
      socket.emit('send-message', {
        room: currentRoom,
        user: userName,
        message: message
      });
    }
  }

  function leaveRoom() {
    if (socket && currentRoom) {
      socket.emit('leave-room', currentRoom);
      setCurrentRoom('');
      setMessages([]);
    }
  }

  const value = {
    messages,
    currentRoom,
    userName,
    isConnected,
    joinRoom,
    sendMessage,
    leaveRoom
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
}

