const express = require('express')
const { createServer } = require('node:http')
const { fileUrlToPath } = require('node:url')
const { dirname, join } = require('node:path')
const { Server } = require('socket.io')

const app = express();
const server = createServer(app)
const roomMessages = new Map()
const io = new Server(server, {
  connectionStateRecovery: {}
})

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
})

io.on('connection', (socket) => {
  socket.on('joinRoom', (userId) => {
    socket.join("userId");
    console.log(`User ${userId} joined room ${userId}`);
    // Send previous messages to the joined user
    const previousMessages = roomMessages.get(userId) || [];
    socket.emit('previousMessages', previousMessages);
  });
  socket.on('privateMessage', (data) => {
    const { userId, message } = data;
    console.log(userId,message)
    //store message for room
    const messages = roomMessages.get(userId) || [];
    messages.push(message);
    roomMessages.set(userId, messages);
    io.to("userId").emit('privateMessage', {
      senderId: userId,
      message
    });
  // socket.on('chat message', (msg) => {
  //   console.log('message: ' + msg);
  //   io.emit('chat message', msg);
  // });
  })
});

server.listen(3000, () => {
  console.log("server is started")
})