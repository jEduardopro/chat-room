import { GetterTree } from 'vuex';
import { SocketState } from './state';
import { StateInterface } from '../index';


const getters: GetterTree<SocketState, StateInterface> = {
	someGetter( /* state */) {
		// return true;
	}
}

export default getters;