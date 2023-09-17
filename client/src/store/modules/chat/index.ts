import { Module } from 'vuex';
import { StateInterface } from '../../index';

import state, { ChatState } from './state';
import actions from './actions';
import mutations from './mutations';


const chatModule: Module<ChatState, StateInterface> = {
    namespaced: true,
    actions,
    mutations,
    state
}


export default chatModule;