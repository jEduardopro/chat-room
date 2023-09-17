import express from 'express'
import { getChat, getChatsByUser, pinChat } from '../controllers/ChatController'

const router = express.Router()

router.route('/').post(getChat)
router.get('/:user', getChatsByUser)
router.patch('/:id', pinChat)

export default router