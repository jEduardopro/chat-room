import { GetterTree } from 'vuex';
import { ChatState } from './state';
import { StateInterface } from '../../index';


const getters: GetterTree<ChatState, StateInterface> = {
	someGetter( /* state */) {
		// return true;
	}
}

export default getters;