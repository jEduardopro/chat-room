import { Chat } from '@/types';

export type ChatState = {
	chats: Chat[];
	chatSelected: Chat | null;
	loadingChat: boolean;
}

function state(): ChatState {
	return {
		chats: [],
		chatSelected: null,
		loadingChat: false
	}
}

export default state;