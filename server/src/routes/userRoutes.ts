import express from 'express'
import { allUsers, registerUser } from '../controllers/UserController'

const router = express.Router()

router.route('/')
	.post(registerUser)
	.get(allUsers)

export default router