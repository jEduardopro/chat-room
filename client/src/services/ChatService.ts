import Api from './Api'

export const getChats = async () => {
	return Api.get('/chat')
}