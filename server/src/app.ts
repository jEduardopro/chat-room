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
import socket from './socket'

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

		io.on('connection', socket)
		
		httpServer.listen(3000, () => {
			console.log(`Server running on port ${port}`.yellow)
		})

	} catch (error) {
		console.log(`Error: ${error.message}`.red);
	}
}

main()