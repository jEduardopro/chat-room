import { Request, Response } from "express";
import Message from "../models/Message";
import User from "../models/User";
import Chat from "../models/Chat";

const sendMessage = async (req: Request, res: Response) => {

	const { user_id, content, chat_id } = req.body

	if (!content || !chat_id || !user_id) {
		res.status(400).json({ message: 'Invalid data' })
	}

	const newMessage = {
		content,
		chat: chat_id,
		sender: user_id
	}

	let message = await Message.create(newMessage)

	await message.populate('sender', 'name pic')
	await message.populate('chat')
	message = await User.populate(message, { path: 'chat.users', select: 'name pic' })

	await Chat.findByIdAndUpdate(chat_id, { latestMessage: message })

	return res.json(message)
}

const getMessagesByChat = async (req: Request, res: Response) => {

	const messages = await Message.find({ chat: req.params.chatId }).populate('sender', 'name pic')
		.populate('chat')
	
	return res.json(messages)
}

export { sendMessage, getMessagesByChat }