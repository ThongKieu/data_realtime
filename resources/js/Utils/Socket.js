import { io } from "socket.io-client";
const ip_address = window.location.hostname;
const socket_port = "3000";
const newSocket = io(ip_address + ":" + socket_port);
export default newSocket;
