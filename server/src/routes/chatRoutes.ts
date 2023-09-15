import express from 'express'
import { getChat } from '../controllers/ChatController'

const router = express.Router()

router.route('/').post(getChat)

export default router