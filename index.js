const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // trả về cho client
    socket.emit("SERVER_SEND_SOCKET_ID", socket.id)

    //- lắng nghe sự kiện
    socket.on('CLIENT_SEND_MESSAGE', (data) => {
        //-console.log(data)

        //-- Khi A gửi data lên server, server chỉ trả về cho A
        //-socket.emit('SERVER_RETURN_MESSAGE', data);
        
        //-- Khi A gửi data lên server, server trả về B CD ....
        // vd: A gửi tin nhắn lỗi, chỉ gửi về cho A thôi
        //- vd: tin nhắn chat
        io.emit('SERVER_RETURN_MESSAGE', data);
        
        //-- Khi A gửi data lên server, server trả về B CD ....(không trả về cho A)
        //- ví dụ: thông báo sinh nhật, typing...

        //socket.broadcast.emit("SERVER_RETURN_MESSAGE", data)
    })
});

server.listen(3000, () => {
  console.log('listening on *:3000 http://localhost:3000');
});

