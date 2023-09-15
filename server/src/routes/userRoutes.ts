import express from 'express'
import { registerUser } from '../controllers/UserController'

const router = express.Router()

router.route('/').post(registerUser)

export default router