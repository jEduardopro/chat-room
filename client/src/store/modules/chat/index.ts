import { Module } from 'vuex';
import { StateInterface } from '../../index';

import state, { ChatState } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';


const chatModule: Module<ChatState, StateInterface> = {
    namespaced: true,
    actions,
    getters,
    mutations,
    state
}


export default chatModule;