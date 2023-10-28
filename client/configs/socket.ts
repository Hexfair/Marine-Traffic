import { io } from 'Socket.IO-client';
//===========================================================================================================

const URL = "http://localhost:4001/usn-traffic";
const socket = io(URL, { autoConnect: true });
export default socket;