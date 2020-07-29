import { Module } from 'vuex';
import { text } from 'express';

interface NotificationModuleState {
    active: boolean;
    text: string;
    timeout: number;
}

const SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
const HIDE_NOTIFICATION = 'HIDE_NOTIFICATION';

export const notification: Module<NotificationModuleState, any> = {
    namespaced: true,
    state: {
        active: false,
        text: '',
        timeout: 2000,
    },

    getters: {
        active(state) {
            return state.active;
        },

        timeout(state) {
            return state.timeout;
        },

        text(state) {
            return state.text;
        },
    },

    mutations: {
        [SHOW_NOTIFICATION](state, text) {
            state.active = true;
            state.text = text;
        },

        [HIDE_NOTIFICATION](state) {
            state.active = false;
            state.text = '';
        },
    },

    actions: {
        show({ commit }, text) {
            commit(SHOW_NOTIFICATION, text);
        },

        hide({ commit }) {
            commit(HIDE_NOTIFICATION);
        },
    },
};
