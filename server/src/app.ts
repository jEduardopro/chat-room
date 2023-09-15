import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import cors from 'cors'

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

app.get('/', (req, res) => {
	res.json({ msg: 'Hello world from socket' })
})

io.on('connection', (socket) => {
	console.log('Connection is ready');
})

const main = async () => {
	try {
		
		httpServer.listen(port, () => {
			console.log(`Server running on port ${port}`)
		})

	} catch (error) {
		
	}
}

main()