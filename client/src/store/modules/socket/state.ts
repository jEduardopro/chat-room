import {Socket} from 'socket.io-client';

export type SocketState = {
	socket: Socket|null;
}

function state(): SocketState {
	return {
		socket: null,
	}
}

export default state;