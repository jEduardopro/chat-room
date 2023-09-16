export type Chat = {
	_id: string
	chatName: string
	users: User[],
	latestMessage: Message|null
}

export type User = {
	_id: string;
	name: string;
	pic: string;
}

export type Message = {
	_id: string;
	chat: Chat;
	content: string;
	sender: User;
	updatedAt: string;
}

export interface Response<T> {
	data: T
}