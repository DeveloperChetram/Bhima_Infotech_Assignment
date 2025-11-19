import express from 'express';
import { getMessagesController, createMessageController } from '../controllers/chat.controllers.js';

const chatRouter = express.Router();

chatRouter.get('/messages', getMessagesController);
chatRouter.post('/messages', createMessageController);

export default chatRouter;

