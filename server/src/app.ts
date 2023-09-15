import express from 'express'
import dotenv from 'dotenv'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'
import { chats } from './data/data'
import { connectDB } from './config/db'
import 'colorts/lib/string';

dotenv.config()
const port = process.env.PORT || 3000;

connectDB()
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

app.get('/', (req, res) => {
	res.json({ msg: 'Hello world from socket' })
})

app.get('/api/chat', (req, res) => {
	res.json(chats)
})

app.get('/api/chat/:id', (req, res) => {
	const chatId = req.params.id
	const chat = chats.find((c) => c._id === chatId)
	res.json(chat)
})

io.on('connection', (socket) => {
	console.log('Connection is ready');
	socket.on('send-message', (msg) => {
		console.log('msg received: ', msg)
		socket.emit('message-from-server', msg)
		// io.emit('message-broadcast', msg)
	})
	socket.on('disconnect', () => {
		console.log('User disconnected');
	})
})


const main = async () => {
	try {
		
		httpServer.listen(port, () => {
			console.log(`Server running on port ${port}`.yellow.bold)
		})

	} catch (error) {
		
	}
}

main()