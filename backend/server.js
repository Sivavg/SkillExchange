import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
import { setupSocket } from './socket/socketHandler.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import matchRoutes from './routes/matchRoutes.js';
import creditRoutes from './routes/creditRoutes.js';

dotenv.config();
connectDB();

const app = express();
const server = createServer(app);

// ✅ UPDATED: CORS Configuration for Production
const io = new Server(server, {
  cors: {
    origin: [
      'http://localhost:5173',  // Local development
      'https://exchangeskill.netlify.app'  // ✅ Production
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }
});

// ✅ UPDATED: CORS Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',  // Local development
    'https://exchangeskill.netlify.app'  // ✅ Production
  ],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Skill Exchange API Running',
    frontend: process.env.FRONTEND_URL,
    environment: process.env.NODE_ENV
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/matches', matchRoutes);
app.use('/api/credits', creditRoutes);

// Socket.io
setupSocket(io);

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${process.env.FRONTEND_URL}`);
});
