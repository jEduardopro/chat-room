import { GetterTree } from 'vuex';
import { UserState } from './state';
import { StateInterface } from '../../index';


const getters: GetterTree<UserState, StateInterface> = {
	someGetter( /* state */) {
		// return true;
	}
}

export default getters;