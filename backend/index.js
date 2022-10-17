const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const socket = require('socket.io')
const path = require('path')
// Routes
const userRoutes = require('./routes/userRoutes')
const messageRoutes = require('./routes/messagesRoutes')

const app = express()
const http = require('http').createServer(app)
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    console.log("production")
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    console.log("DEV")
    const corsOptions = {
        origin: ['http://127.0.0.1:5173', 'http://127.0.0.1:8080',
            'http://localhost:8080', 'http://127.0.0.1:3000',
            'http://localhost:3000', 'http://127.0.0.1:3030',
            'http://localhost:3030', 'http://localhost:5173'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

app.use("/api/auth", userRoutes)
app.use("/api/messages", messageRoutes)

mongoose.connect('mongodb+srv://yuvallevi5:21227159@cluster0.xabqg.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB connection made')
}).catch(err => console.error(err))

const server = http.listen(process.env.PORT, () => {
    console.log('App listening on port ' + process.env.PORT)
})

const io = socket(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.message);
    }
  });
})
