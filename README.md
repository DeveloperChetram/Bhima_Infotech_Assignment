# Real-Time Chat Application

A simple real-time chat application built with Node.js, Socket.IO, React, and MongoDB.

## Features

- Real-time messaging using Socket.IO
- Default chat room for all users
- Message history stored in MongoDB
- Simple and clean UI
- Responsive design

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14.0.0 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - [Download here](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas) (cloud)
- **npm** (comes with Node.js)

## Project Structure

```
BM/
├── backend/          # Node.js + Express + Socket.IO server
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── socket/
│   │   └── db/
│   └── server.js
├── frontend/         # React + Socket.IO client
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── api/
│   │   └── styles/
│   └── package.json
└── README.md
```

## Backend Setup

### 1. Navigate to backend directory

```bash
cd backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment file

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
COOKIE_EXPIRES_IN=5d
```

**For MongoDB Atlas (Cloud):**
- Replace `MONGODB_URI` with your Atlas connection string
- Example: `mongodb+srv://username:password@cluster.mongodb.net/chat-app`

### 4. Start MongoDB (if using local MongoDB)

**Windows:**
```bash
net start MongoDB
```

**Mac/Linux:**
```bash
mongod
```

### 5. Start the backend server

```bash
npm run dev
```

The server will start on `http://localhost:5000`

## Frontend Setup

### 1. Navigate to frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Running the Application

1. **Start MongoDB** (if using local MongoDB)
2. **Start the backend server:**
   ```bash
   cd backend
   npm run dev
   ```
3. **Start the frontend server** (in a new terminal):
   ```bash
   cd frontend
   npm run dev
   ```
4. **Open your browser** and go to `http://localhost:5173`
5. **Enter your name** and click "Join Default Room"
6. **Start chatting!**

## API Endpoints

### REST API

#### Get Messages
- **Method:** `GET`
- **Endpoint:** `/api/chat/messages?room=general`
- **Response:**
```json
{
  "success": true,
  "message": "Messages retrieved successfully",
  "data": {
    "messages": [...]
  }
}
```

#### Create Message
- **Method:** `POST`
- **Endpoint:** `/api/chat/messages`
- **Body:**
```json
{
  "room": "general",
  "user": "John Doe",
  "message": "Hello everyone!"
}
```

### Socket.IO Events

#### Client → Server

**Join Room:**
```javascript
socket.emit('join-room', 'general');
```

**Send Message:**
```javascript
socket.emit('send-message', {
  room: 'general',
  user: 'John Doe',
  message: 'Hello everyone!'
});
```

**Leave Room:**
```javascript
socket.emit('leave-room', 'general');
```

#### Server → Client

**Room Joined:**
```javascript
socket.on('room-joined', (data) => {
  console.log('Joined room:', data.room);
});
```

**Receive Message:**
```javascript
socket.on('receive-message', (data) => {
  console.log('New message:', data);
});
```

**Error:**
```javascript
socket.on('error', (data) => {
  console.error('Error:', data.message);
});
```

## Environment Variables

### Backend (.env)

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | Required |
| `JWT_SECRET` | JWT signing secret | Required |
| `PORT` | Server port | 5000 |
| `NODE_ENV` | Environment mode | development |
| `FRONTEND_URL` | Frontend URL for CORS | http://localhost:5173 |
| `COOKIE_EXPIRES_IN` | Cookie expiration | 5d |

## Troubleshooting

### MongoDB Connection Error

If you see `Database connection error`:

1. **Check if MongoDB is running:**
   - Windows: `net start MongoDB`
   - Mac/Linux: Check if `mongod` process is running

2. **Verify MongoDB URI in `.env` file:**
   - Local: `mongodb://localhost:27017/chat-app`
   - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/chat-app`

3. **Note:** The chat will work even without MongoDB, but messages won't be saved.

### Port Already in Use

If port 5000 is already in use:

1. Change `PORT` in `backend/.env` to a different port (e.g., `5001`)
2. Update `API_URL` in `frontend/src/api/api.jsx` to match the new port
3. Update socket connection in `frontend/src/context/ChatContext.jsx` to match the new port

### CORS Error

If you see CORS errors:

1. Make sure `FRONTEND_URL` in `backend/.env` matches your frontend URL
2. Default is `http://localhost:5173` for Vite

## Technologies Used

### Backend
- Node.js
- Express.js
- Socket.IO
- MongoDB
- Mongoose

### Frontend
- React
- Socket.IO Client
- Axios
- Vite

## Development

### Backend Scripts

```bash
npm run dev    # Start development server with nodemon
npm start     # Start production server
```

### Frontend Scripts

```bash
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

## License

MIT

