// ES
import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: { origin: "*" },
});

io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("userOnline", (userId) => {
        console.log(`User ${userId} is online`);
        io.sockets.emit("userOnline_Client", userId);
    });
    socket.on("pushOnline", (message) => {
        console.log("User:", message, "is online");
        io.sockets.emit("sentListOnline_Client", message);
    });
    socket.on("addWorkTo_Server", async (formData1) => {
        console.log("Received form data addWork:", formData1);
        io.sockets.emit("sendAddWorkTo_Client", formData1);
    });
    socket.on("ButtonDisable_To_Server", async (isDisabled) => {
        console.log("Button Disable:", isDisabled);
        io.sockets.emit("ButtonDisable_To_Client", isDisabled);
    });
    socket.on("UpdateDateTable_To_Server", async (Data) => {
        console.log("Received form data UpdateDateTable:", Data);
        io.sockets.emit("UpdateDateTable_To_Client", Data);
    });
    socket.on("deleteWorkTo_Server", async (data) => {
        console.log("Receiva:", data);
        io.sockets.emit("deleteWorkTo_Client", data);
    });
    // Application
    socket.on("sendWorkWebToServer", async (data) => {
        io.sockets.emit("sendWorkServerToMobile", data);
    });
    socket.on("returnWorkWebToServer", async (data) => {
        io.sockets.emit("returnWorkServerToMobile", data);
    });
    // // Xử lý sự kiện khi máy khách ngắt kết nối
    socket.on('disconnect', (id) => {
        // app.post('/api/web/disconnect', () => {
        //     // Xử lý logic API ở đây
        //     // res.json({ message: 'API response' });
        //     console.log('đã run api!');
        //   });
          
        console.log('User disconnected:',socket.id);
      });
    // socket.on("disconnect", () => {
    //     console.log("User disconnected");
    //     io.sockets.emit("userOffline", socket.id);
    // });
});

httpServer.listen(3000, function () {
    console.log("server running");
});
