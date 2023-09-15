import { Chat, Response } from '@/types'
import Api from './Api'

export const getChats = async (): Promise<Response<Chat[]>> => {
	return Api.get('/chat')
}