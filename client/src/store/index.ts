import { createStore } from 'vuex'
import { SocketState } from './modules/socket/state'
import { UserState } from './modules/user/state';
import { ChatState } from './modules/chat/state';

import socketModule from './modules/socket';
import userModule from './modules/user';
import chatModule from './modules/chat';

export interface StateInterface {
	socket: SocketState;
	user: UserState;
	chat: ChatState;
}

export default createStore<StateInterface>({
  modules: {
		socket: socketModule,
		user: userModule,
		chat: chatModule
  }
})