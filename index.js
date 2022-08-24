const http = require("http");
const express = require("express");
const socketIO = require("socket.io")
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4500;

const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

const users = [{}];
console.log(users);
app.use("/", (req, res) => {
    res.send('hello world')
})

io.on('connection', (socket) => {
    // console.log("hello connected");
    socket.on("joined", ({ user }) => {
        users[socket.id] = user;
        socket.emit('welcome', { user: "admin", message: `Welcome to the Chat:${users[socket.id]}` })
        socket.broadcast.emit('userJoined', { user: "admin", message: `${users[socket.id]} has joined` })
    })
    socket.on("message",({chat,id})=>{
        io.emit('sendMessage',{user:users[id],message:chat,id})

    })
    socket.on('disconnect', () => {
        socket.broadcast.emit("leave", { user: "Admin", message: `${users[socket.id]},has left` })

        console.log("user has left");
    })

})



server.listen(port, () => {
    console.log(`express server running on port ${port}`)
})



