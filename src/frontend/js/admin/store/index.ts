import Vuex from 'vuex';
import Vue from 'vue';

Vue.use(Vuex);

import { segment } from './modules/segment';
import { user } from './modules/user';
import { notification } from './modules/notification';
const store = new Vuex.Store({
    modules: {
        segment,
        user,
        notification,
    },
});

export default store;
