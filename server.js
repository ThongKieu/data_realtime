// ES
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    const i = 1;
    const j = i+1;
    
    console.log("user connected",j);
    socket.on("pushOnline", (message) => {
        console.log('User:',message,' is online');
        io.sockets.emit('sentListOnline_Client',message);
        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
    // ... your code
    // socket.on("sendChatToServer", (message) => {
    //     console.log(message);
    //     io.sockets.emit("sendChatToClient", message);
    //     socket.broadcast.emit("sendChatToClient", message);
    //     socket.on("disconnect", () => {
    //         console.log("A user disconnected");
    //     });
    // });
  
    // socket.on("addWorkTo_Server", async (formData1) => {
    //     console.log("Received form data:", formData1);
    //     io.sockets.emit("sendAddWorkTo_Client", formData1);
    //     socket.on("disconnect", () => {
    //         console.log("A user disconnected");
    //     });
    // });
    // Xử lý sự kiện khi máy khách ngắt kết nối
   
    return () => {
        socket.disconnect();
    };
});

httpServer.listen(3000, function () {
    console.log("server running");
});




// NO DELETE THIS IS SERVER HTTPS ON SERVER
// ES
// const { readFileSync } = require("fs");
// const { createServer } = require("https");
// const { Server } = require("socket.io");

// const httpsServer = createServer({
//      "key" : readFileSync( "./public/ssl/private.key" ),
//      "cert": readFileSync( "./public/ssl/certificate.crt" ),
//      "ca"  : readFileSync( "./public/ssl/ca_bundle.crt"   )
//  });
// const io = new Server(httpsServer, {  cors: { origin: "*" }, });
// //const io = new Server(httpServer, {
//  //   cors: { origin: "*" },
// //});

// io.on("connection", (socket) => {
//     console.log("user connected");
//     // ... your code
//     socket.on("sendChatToServer", (message) => {
//         console.log(message);
//         io.sockets.emit("sendChatToClient", message);
//         socket.broadcast.emit("sendChatToClient", message);
       
//     });
//     socket.on("pushOnline", (message) => {
//         console.log('User:',message,' is online');
//         io.sockets.emit('sentListOnline_Client',message);
      
//     });
//     socket.on("addWorkTo_Server", async (formData1) => {
//         console.log("Received form data:", formData1);
//         io.sockets.emit("sendAddWorkTo_Client", formData1);
        
//     });
//     // Xử lý sự kiện khi máy khách ngắt kết nối
//     socket.on("disconnect", () => {
//         console.log("A user disconnected");
//     });
//     return () => {
//         socket.disconnect();
//     };
// });

// httpsServer.listen(3000, function () {
//     console.log("server running");
// });
