import { MutationTree } from 'vuex';
import { UserState } from './state';

const mutations: MutationTree<UserState> = {
	setUser(state: UserState, user) {
		state.user = user;
	}
}

export default mutations;