import { Socket } from "socket.io";

const sockets = (socket: Socket) => {
	socket.on('join', (userID) => {
		socket.join(userID)
		socket.emit('connected')
	})

	socket.on('joinChat', (chatId) => {
		socket.join(chatId)
	})

	socket.on('typing', (room) => socket.to(room).emit('typing'))
	socket.on('stopTyping', (room) => socket.to(room).emit('stopTyping'))

	socket.on('newMessage', (message) => {
		const chat = message.chat
		if (!chat || !chat.users) {
			console.log('chat or chat.users not defined');
			return
		}
		
		chat.users.forEach((user) => {
			if (user.id === message.sender.id) return
			socket.to(user.id).emit('messageReceived', message)
		})
		
	})

	socket.on('disconnecting', () => {
		socket.rooms.forEach((room) => {			
			socket.to(room).emit('userDisconnected', socket.id)
		})
	})

	socket.on('disconnect', () => {
	})
}

export default sockets