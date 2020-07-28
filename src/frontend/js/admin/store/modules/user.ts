import { Module } from 'vuex';

const SET_USERS = 'SET_USERS';
const DELETE_USER = 'DELETE_USER';

interface UserModuleState {
    users: any[];
}

export const user: Module<UserModuleState, any> = {
    namespaced: true,
    state: {
        users: [],
    },
    getters: {
        users(state) {
            return state.users;
        },
    },
    mutations: {
        [SET_USERS](state, users) {
            state.users = users;
        },

        [DELETE_USER](state, id: number) {
            const existing = state.users.findIndex(
                existingUser => existingUser.id === id,
            );
            if (existing) {
                state.users.splice(existing, 1);
            }
        },
    },

    actions: {
        setUsers({ commit }, users) {
            commit(SET_USERS, users);
        },

        deleteUser({ commit }, id: number) {
            commit(DELETE_USER, id);
        },
    },
};
