<template>
    <v-container>
        <UsersTable :users="users" />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UsersTable from '../components/User/UsersTable.vue';
import axios from 'axios';
import { Getter, Action } from 'vuex-class';
import API from '../api';
import { UserRolePayload } from '../components/User/interfaces';

@Component({
    components: {
        UsersTable,
    },
})
export default class UsersView extends Vue {
    @Getter('user/users') users;
    @Action('user/setUsers') setUsers: (users: any) => void;
    async mounted() {
        const users = await API.getUsers();
        this.setUsers(users);
    }
}
</script>
