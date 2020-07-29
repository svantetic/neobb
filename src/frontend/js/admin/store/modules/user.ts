import { Module } from 'vuex';
import { UserRolePayload } from '../../components/User/interfaces';

const SET_USERS = 'SET_USERS';
const DELETE_USER = 'DELETE_USER';
const CHANGE_ROLE = 'CHANGE_ROLE';

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

        [CHANGE_ROLE](state, user: UserRolePayload) {
            const userToChangeRole = state.users.find(
                existingUser => existingUser.id === user.id,
            );

            if (!userToChangeRole) {
                return;
            }

            userToChangeRole.role = user.role;
        },
    },

    actions: {
        setUsers({ commit }, users) {
            commit(SET_USERS, users);
        },

        deleteUser({ commit }, id: number) {
            commit(DELETE_USER, id);
        },

        changeRole({ commit }, user: UserRolePayload) {
            commit(CHANGE_ROLE, user);
        },
    },
};
