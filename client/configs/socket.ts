import { io } from 'Socket.IO-client';
//===========================================================================================================

const URL = "http://localhost:4001/usn-traffic";
const socket = io(URL, { autoConnect: false });
export default socket;