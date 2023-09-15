import { ActionTree } from 'vuex';
import { UserState } from './state';
import { StateInterface } from '../../index';


const actions: ActionTree<UserState, StateInterface> = {
	someAction( /*{ commit }, payload  */) {
		// a line to prevent linter errors
	}
}

export default actions;