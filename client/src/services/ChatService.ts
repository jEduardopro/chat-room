import { Chat, Response } from '@/types'
import Api from './Api'

export const getChatsByUser = async (userId: string): Promise<Response<Chat[]>> => {
	return Api.get(`/chats/${userId}`)
}

export const createChat = async (data: {user: string, user_id: string}): Promise<Response<Chat>> => {
	return Api.post(`/chats`, data)
}

export const updatePinChat = async (chatId: string, data: { pin: boolean }): Promise<Response<string>> => {
	return Api.patch(`/chats/${chatId}`, data)
}