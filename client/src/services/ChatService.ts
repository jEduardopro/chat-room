import { Chat, Response } from '@/types'
import Api from './Api'

export const getChatsByUser = async (userId: string): Promise<Response<Chat[]>> => {
	return Api.get(`/chat/${userId}`)
}

export const createChat = async (data: {user: string, user_id: string}): Promise<Response<Chat>> => {
	return Api.post(`/chat`, data)
}