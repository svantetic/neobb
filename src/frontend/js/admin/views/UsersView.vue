<template>
    <v-container>
        <UsersTable
            :users="users"
            @user-role-changed="applyUserRoleChanged"
            @user-banned="deleteUser"
        />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UsersTable from '../components/User/UsersTable.vue';
import axios from 'axios';
import { Getter, Action } from 'vuex-class';
import API from '../api';

@Component({
    components: {
        UsersTable,
    },
})
export default class UsersView extends Vue {
    @Getter('user/users') users;
    @Action('user/setUsers') setUsers: (users: any) => void;
    @Action('user/deleteUser') deleteUser: (id: number) => void;
    async mounted() {
        const users = await API.getUsers();
        this.setUsers(users);
    }

    applyUserRoleChanged(user: { id: number; role: string }) {
        const userToChangeRole = this.users.find(
            existingUser => existingUser.id === user.id,
        );
        if (!userToChangeRole) {
            return;
        }

        userToChangeRole.role = user.role;
    }
}
</script>
