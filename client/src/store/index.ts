import { createStore } from 'vuex'
import { SocketState } from './modules/state'

// My custom modules
import socketModule from './modules';
// import { ExampleStateInterface } from './module-template/state';


export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  socket: SocketState
}

export default createStore<StateInterface>({
  modules: {
		// example: exampleModule
		socket: socketModule
  }
})