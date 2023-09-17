export type Chat = {
	id: string
	chatName: string
	users: User[],
	latestMessage: Message | null;
	pinned: boolean;
}

export type User = {
	id: string;
	name: string;
	pic: string;
}

export type Message = {
	id: string;
	chat: Chat;
	content: string;
	sender: User;
	createdAt: string;
	updatedAt: string;
}

export interface Response<T> {
	data: T
}