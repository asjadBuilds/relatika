import { io } from "socket.io-client";

const BASE_URL = 'https://relatika-backend.onrender.com';
// const BASE_URL = 'http://localhost:5000';

const socket = io(BASE_URL);

export default socket