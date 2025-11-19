import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true
});

export function getMessages(room) {
  return api.get('/chat/messages', {
    params: { room }
  });
}

export function createMessage(data) {
  return api.post('/chat/messages', data);
}

