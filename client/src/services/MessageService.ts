import { Message, Response } from '@/types'
import Api from './Api'

export const getMessagesByChat = (chat_id: string): Promise<Response<Message[]>> => {
	return Api.get(`/message/${chat_id}`)
}

export const sendMessage = async (data: {user_id: string, content: string, chat_id: string}): Promise<Response<Message>> => {
	return Api.post(`/message`, data)
}