import { User, Response } from '@/types'
import Api from './Api'

export const register = async (name: string): Promise<Response<User[]>> => {
	return Api.post('/users', { name })
}

export const getUsers = async (q: string|null = null): Promise<Response<User[]>> => {
	return Api.get('/users', {params: {q}})
}