import express from 'express'
import { getChat, getChatsByUser } from '../controllers/ChatController'

const router = express.Router()

router.route('/').post(getChat)
router.get('/:user', getChatsByUser)

export default router