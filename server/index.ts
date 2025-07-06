import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import webhookRoutes from './server/routes/webhook.routes.js'; // Update path if needed

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
cors: {
origin: process.env.CORS_ORIGIN || "*",
methods: ["GET", "POST"]
}
});

app.use(cors());
app.use(express.json());
app.use('/api/webhooks', webhookRoutes);

mongoose
.connect(process.env.MONGO_URI || '')
.then(() => console.log('MongoDB Connected'))
.catch(err => console.error('MongoDB connection error:', err));

io.on('connection', socket => {
console.log('Driver connected:', socket.id);
socket.on('locationUpdate', data => {
io.emit('locationBroadcast', data);
});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));