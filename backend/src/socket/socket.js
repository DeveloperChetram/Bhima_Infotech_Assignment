import { Server } from 'socket.io';
import messageModel from '../models/message.model.js';
import mongoose from 'mongoose';

let io;

const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: process.env.FRONTEND_URL || 'http://localhost:3000',
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('join-room', async (room) => {
            socket.join(room);
            console.log(`User ${socket.id} joined room: ${room}`);
            socket.emit('room-joined', { room });
        });

        socket.on('send-message', async (data) => {
            try {
                const { room, user, message } = data;

                if (!room || !user || !message) {
                    socket.emit('error', { message: 'Missing required fields' });
                    return;
                }

                const msgData = {
                    _id: Date.now().toString(),
                    room,
                    user,
                    message,
                    createdAt: new Date()
                };

                if (mongoose.connection.readyState === 1) {
                    try {
                        const savedMsg = await messageModel.create({ room, user, message });
                        msgData._id = savedMsg._id.toString();
                        msgData.createdAt = savedMsg.createdAt;
                    } catch (err) {
                        console.log('DB save failed');
                    }
                }

                io.to(room).emit('receive-message', msgData);

            } catch (error) {
                console.error('Error:', error);
                socket.emit('error', { message: 'Failed to send' });
            }
        });

        socket.on('leave-room', (room) => {
            socket.leave(room);
            console.log(`User ${socket.id} left room: ${room}`);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected:', socket.id);
        });
    });

    return io;
};

export default initializeSocket;

