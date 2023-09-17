import { Module } from 'vuex';
import { StateInterface } from '../../index';

import state, { UserState } from './state';
import mutations from './mutations';

const userModule: Module<UserState, StateInterface> = {
    namespaced: true,
    mutations,
    state
}


export default userModule;