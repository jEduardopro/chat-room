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
		return res.status(400).json({
			message: "User already exists"
		})
	}

	const user = await User.create({ name })
	
	if (user) {
		return res.status(201).json({
			_id: user._id,
			name: user.name,
			pic: user.pic,
		})
	}

	return res.status(400).json({
		message: "Failed to create the user"
	})
}

export { registerUser }