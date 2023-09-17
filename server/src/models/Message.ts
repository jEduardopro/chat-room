import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema({
	chat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Chat'
	},
	sender: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	content: { type: String, trim: true },
}, {
	timestamps: true
})

MessageSchema.set('toJSON', {
	transform: (doc, obj) => {
		obj.id = obj._id
		delete obj.__v
		delete obj._id
	}
})

const Message = mongoose.model('Message', MessageSchema)

export default Message