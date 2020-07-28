import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import { segment } from './modules/segment';
import { user } from './modules/user';
const store = new Vuex.Store({
    modules: {
        segment,
        user,
    },
});

export default store;
