export type Chat = {
	_id: string
	chatName: string
	users: User[]
}

export type User = {
	name: string
}

export interface Response<T> {
	data: T
}