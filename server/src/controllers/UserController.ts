import { Request, Response } from "express"
import User from '../models/User'

const registerUser = async (req: Request, res: Response) => {
	const { name } = req.body

	if (!name) {
		return res.status(400).json({
			message: "Name is required"
		})
	}

	const userExists = await User.findOne({ name })

	if (userExists) {
		return res.status(200).json({
			id: userExists._id,
			name: userExists.name,
			pic: userExists.pic,
		})
	}

	const user = await User.create({ name })
	
	if (user) {
		return res.status(200).json({
			id: user._id,
			name: user.name,
			pic: user.pic,
		})
	}

	return res.status(400).json({
		message: "Failed to create the user"
	})
}

const allUsers = async (req: Request, res: Response) => {	
	const pattern = req.query.q ? {
		$or: [
			{ name: { $regex: req.query.q, $options: 'i' } },
		],
	} : {}

	const users = await User.find(pattern)

	res.json(users)
	
}

export { allUsers, registerUser }