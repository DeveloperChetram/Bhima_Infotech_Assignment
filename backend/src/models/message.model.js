import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    room: {
        type: String,
        required: true,
        trim: true
    },
    user: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const messageModel = mongoose.model('messages', messageSchema);
export default messageModel;

