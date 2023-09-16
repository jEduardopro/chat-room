import { MutationTree } from 'vuex';
import { ChatState } from './state';

const mutations: MutationTree<ChatState> = {
	setChats(state: ChatState, chats) {
		state.chats = chats;
	},
	setMessages(state: ChatState, messages) {
		state.messages = messages;
	},
	setLoadingChat(state: ChatState, status) {
		state.loadingChat = status;
	},
	addChat(state: ChatState, chat) {
		state.chats = [chat, ...state.chats];
	},
	setChatSelected(state: ChatState, chat) {
		state.chatSelected = chat;
	}
}

export default mutations;