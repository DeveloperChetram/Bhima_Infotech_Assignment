import 'dotenv/config';
import { createServer } from 'http';
import app from './src/app.js';
import connectDB from './src/db/db.js';
import initializeSocket from './src/socket/socket.js';

const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Create HTTP server
const server = createServer(app);

// Initialize Socket.IO
initializeSocket(server);

// Start server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Socket.IO server initialized`);
});
