import { io } from 'socket.io-client'

export const socket = io('http://localhost:3000', {
	reconnection: true,
	reconnectionDelay: 2000,
	reconnectionDelayMax: 5000,
	withCredentials: false,
	reconnectionAttempts: 2,
})