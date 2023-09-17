import { ActionTree } from 'vuex';
import { ChatState } from './state';
import { StateInterface } from '../../index';
import { getChatsByUser } from '@/services/ChatService';

const actions: ActionTree<ChatState, StateInterface> = {
	async getAllChats( { commit }, userId ) {
		try {
			const { data } = await getChatsByUser(userId);
			commit('setChats', data);
		} catch (error) {
			console.log(error);			
		}
	}
}

export default actions;