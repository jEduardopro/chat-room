import { MutationTree } from 'vuex';
import { SocketState } from './state';

const mutations: MutationTree<SocketState> = {
	setSocket(state: SocketState, socket) {
		state.socket = socket;
	}
}

export default mutations;