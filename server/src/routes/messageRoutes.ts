import express from 'express'
import { sendMessage, getMessagesByChat } from '../controllers/MessageController'

const router = express.Router()

router.route('/').post(sendMessage)
router.route('/:chatId').get(getMessagesByChat)


export default router