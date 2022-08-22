const http = require("http");
const express= require("express");
const socketIO = require("socket.io")
const cors = require("cors");

const app = express();
const port = 4500;

const server = http.createServer(app);
const io = socketIO(server);
app.use(cors());

app.use("/", (req, res)=>{
    res.send('hello world')
})

io.on('connection',()=>{
    console.log('someone connected')
})
 


server.listen(port,()=>{
    console.log(`express server running on port ${port}`)
})



