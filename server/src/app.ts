import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import { connectDB } from './config/db'
import 'colorts/lib/string';
import userRoutes from './routes/userRoutes'
import chatRoutes from './routes/chatRoutes'
import messageRoutes from './routes/messageRoutes'

dotenv.config()
const port = process.env.PORT || 3000;

const app = express()
app.use(cors())
app.use(express.json())

const httpServer = http.createServer(app)
const io = new Server(httpServer, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	}
})

const main = async () => {
	try {

		await connectDB()

		app.use('/api/users', userRoutes)
		app.use('/api/chats', chatRoutes)
		app.use('/api/message', messageRoutes)

		io.on('connection', (socket) => {
			socket.on('join', (userID) => {
				console.log('user received: ', userID)

				socket.join(userID)
				socket.emit('connected')
				
			})
			socket.on('joinChat', (chatId) => {
				socket.join(chatId)
				console.log('User joined chat: ', chatId);
			})

			socket.on('typing', (room) => socket.to(room).emit('typing'))
			socket.on('stopTyping', (room) => socket.to(room).emit('stopTyping'))

			socket.on('newMessage', (message) => {
				console.log('new message received ')
				const chat = message.chat
				if (!chat || !chat.users) {
					console.log('chat or chat.users not defined');
					return
				}
				// const rooms = io.of("/").adapter.rooms;
				// const sids = io.of("/").adapter.sids;
				// console.log('rooms: ', rooms);
				// console.log('sids: ', sids);
				
				
				chat.users.forEach((user) => {
					if (user._id === message.sender._id) return
					socket.to(user._id).emit('messageReceived', message)
					console.log('message sent to: ', user._id);
				})
				
			})

			socket.on('disconnecting', () => {
				console.log('user disconnecting');
				socket.rooms.forEach((room) => {
					console.log('room disconnected: ', room);
					
					socket.to(room).emit('userDisconnected', socket.id)
				})
			})

			socket.on('disconnect', () => {
				console.log('User disconnected');
			})
		})
		
		httpServer.listen(port, () => {
			console.log(`Server running on port ${port}`.yellow.bold)
		})

	} catch (error) {
		console.log(`Error: ${error.message}`.red.bold);
	}
}

main()