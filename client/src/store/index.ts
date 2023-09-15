import { createStore } from 'vuex'
import { SocketState } from './modules/socket/state'
import { UserState } from './modules/user/state';

import socketModule from './modules/socket';
import userModule from './modules/user';

export interface StateInterface {
	socket: SocketState
	user: UserState
}

export default createStore<StateInterface>({
  modules: {
		socket: socketModule,
		user: userModule
  }
})