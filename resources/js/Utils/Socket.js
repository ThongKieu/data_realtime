import { io } from "socket.io-client";
const ip_address = window.location.hostname;
const socket_port = "3000";
const newSocket = io(ip_address + ":" + socket_port,{
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
});
export default newSocket;
