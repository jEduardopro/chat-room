import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
	chatName: { type: String, trim: true },
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	lastestMessage: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	},
}, {
	timestamps: true
})

const Chat = mongoose.model('Chat', ChatSchema)

export default Chat