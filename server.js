// ES
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("user connected");

    socket.on("pushOnline", (message) => {
        console.log('User:',message,' is online');
        io.sockets.emit('sentListOnline_Client',message);
    });
    socket.on("addWorkTo_Server", async (formData1) => {
        console.log("Received form data:", formData1);
        io.sockets.emit("sendAddWorkTo_Client", formData1);
    });
    socket.on("UpdateDateTable_To_Server", async (Data) => {
        console.log("Received form data:", Data);
        io.sockets.emit("UpdateDateTable_To_Client", Data);
    });
    socket.on("TungTest", async (message) => {
        console.log('Test: ', message);
        io.sockets.emit('TungTestClient','Server gửi Tùng nè !!');
    });
    socket.on("deleteWorkTo_Server", async (data) => {
        console.log("Receiva:", data);
        io.sockets.emit("deleteWorkTo_Client", data);
    });
    // Xử lý sự kiện khi máy khách ngắt kết nối
    return () => {
        socket.disconnect();
    };
});

httpServer.listen(3000, function () {
    console.log("server running");
});
