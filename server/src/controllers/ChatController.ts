import { Request, Response } from "express"
import Chat from '../models/Chat'
import User from "../models/User"

const getChat = async (req: Request, res: Response) => {
	const { user, user_id } = req.body

	if (!user_id) {
		return res.status(400).json({
			message: "User ID is required"
		})
	}

	const chat = await Chat.find({
		$and: [
			{ users: { $elemMatch: { $eq: user } } },
			{ users: { $elemMatch: { $eq: user_id } } },
		]
	}).populate('users')
		.populate('latestMessage')
	
	const userChat = await User.populate(chat, { path: 'latestMessage.sender', select: 'name pic' })

	if (userChat.length > 0) {
		return res.status(200).json(userChat)
	}

	const userForChat = await User.findById(user_id).select('name')

	const newChat = await Chat.create({chatName: userForChat.name, users: [user, user_id]	})
	const newUserChat = await Chat.findOne({ _id: newChat._id }).populate('users')
	return res.status(200).json(newUserChat)
}

export { getChat }