import mongoose from 'mongoose'

const ChatSchema = new mongoose.Schema({
	chatName: { type: String, trim: true },
	users: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}
	],
	latestMessage: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Message'
	},
	pinned: {
		type: Boolean,
		default: false
	}
}, {
	timestamps: true
})

ChatSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id
		delete obj.__v
		delete obj._id
	}
})

const Chat = mongoose.model('Chat', ChatSchema)

export default Chat