import { Module } from 'vuex';
import { StateInterface } from '../../index';

import state, { SocketState } from './state';
import mutations from './mutations';


const socketModule: Module<SocketState, StateInterface> = {
    namespaced: true,
    mutations,
    state
}


export default socketModule;