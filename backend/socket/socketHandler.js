import Message from '../models/Message.js';

export const setupSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_room', (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
    });

    socket.on('send_message', async (data) => {
      try {
        const { matchId, sender, receiver, content, roomId } = data;

        const message = await Message.create({
          match: matchId,
          sender,
          receiver,
          content
        });

        const populatedMessage = await Message.findById(message._id)
          .populate('sender', 'name avatar');

        io.to(roomId).emit('receive_message', populatedMessage);
      } catch (error) {
        console.error('Message error:', error);
      }
    });

    socket.on('typing', (data) => {
      socket.to(data.roomId).emit('user_typing', data);
    });

    socket.on('leave_room', (roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} left room ${roomId}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
