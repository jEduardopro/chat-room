import { ActionTree } from 'vuex';
import { SocketState } from './state';
import { StateInterface } from '../../index';


const actions: ActionTree<SocketState, StateInterface> = {
	someAction( /*{ commit }, payload  */) {
		// a line to prevent linter errors
	}
}

export default actions;