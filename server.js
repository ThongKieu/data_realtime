// ES
import { createServer } from "http";
import { Server } from "socket.io";

// import https from 'node:https';
// import http from 'node:http';
// import fs from 'node:fs';

// const httpsServer = https.createServer({
//     "key" : fs.readFileSync( "./public/site.test/server.key" ),
//     "cert": fs.readFileSync( "./public/site.test/server.crt" ),
//     "ca"  : fs.readFileSync( "./public/site.test/server.crt"   )
// });
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("user connected");
    // ... your code
    socket.on("sendChatToServer", (message) => {
        console.log(message);
        io.sockets.emit("sendChatToClient", message);
        socket.broadcast.emit("sendChatToClient", message);
       
    });
    socket.on("pushOnline", (message) => {
        console.log('User:',message,' is online');
        io.sockets.emit('sentListOnline_Client',message);
      
    });
    socket.on("addWorkTo_Server", async (formData1) => {
        console.log("Received form data:", formData1);
        io.sockets.emit("sendAddWorkTo_Client", formData1);
        
    });
    // Xử lý sự kiện khi máy khách ngắt kết nối
    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
    return () => {
        socket.disconnect();
    };
});

httpServer.listen(3000, function () {
    console.log("server running");
});
