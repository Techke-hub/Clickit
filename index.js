require('dotenv').config();
const http = require('http');
const app = require('./app');
const { Server } = require('socket.io');
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', (socket) => {
  console.log('socket connected', socket.id);
  socket.on('join', (room) => socket.join(room));
  socket.on('chatMessage', (msg) => {
    // emit to recipient room
    io.to(msg.toRoom).emit('chatMessage', msg);
  });
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server listening on ${PORT}`));
