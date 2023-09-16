import { Chat, Message} from '@/types';

export type ChatState = {
	chats: Chat[];
	messages: Message[];
	chatSelected: Chat | null;
	loadingChat: boolean;
}

function state(): ChatState {
	return {
		chats: [],
		messages: [],
		chatSelected: null,
		loadingChat: false
	}
}

export default state;