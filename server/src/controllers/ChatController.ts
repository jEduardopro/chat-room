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
		.populate({ path: 'latestMessage', strictPopulate: false })

	const userChat = await User.populate(chat, { path: 'latestMessage.sender', select: 'name pic' })

	if (userChat.length > 0) {
		return res.status(200).json(userChat[0])
	}

	const userForChat = await User.findById(user_id).select('name')

	const newChat = await Chat.create({ chatName: userForChat.name, users: [user, user_id], latestMessage: null })
	const newUserChat = await Chat.findOne({ _id: newChat._id }).populate('users').populate({ path: 'latestMessage', strictPopulate: false })
	return res.status(200).json(newUserChat)
}

const getChatsByUser = async (req: Request, res: Response) => {

	if (!req.params.user) {
		return res.status(400).json({
			message: "Current User ID is required"
		})
	}

	Chat.find({ users: { $elemMatch: { $eq: req.params.user } } })
		.populate('users')
		.populate({ path: 'latestMessage', strictPopulate: false })
		.sort({ createdAt: -1 })
		.then(async (chats) => {
			const results = await User.populate(chats, { path: 'latestMessage.sender', select: 'name pic', strictPopulate: false })

			res.status(200).json(results)
		})
}

const pinChat = async (req: Request, res: Response) => {
	await Chat.findByIdAndUpdate(req.params.id, { pinned: req.body.pin })

	res.status(200).json({ message: 'Chat updated' })
}

export { getChat, getChatsByUser, pinChat }