<template>
    <v-container>
        <UsersTable
            :users="users"
            @user-promoted="applyUserPromotion"
            @user-banned="removeUser"
        />
    </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import UsersTable from '../components/User/UsersTable.vue';
import axios from 'axios';

@Component({
    components: {
        UsersTable,
    },
})
export default class UsersView extends Vue {
    users: any[] = [];
    async mounted() {
        const response = await axios.get('/admin/users');
        this.users = response.data.users;
    }

    applyUserPromotion(user: { id: number; role: string }) {
        const userToPromote = this.users.find(
            existingUser => existingUser.id === user.id,
        );
        if (!userToPromote) {
            return;
        }

        userToPromote.role = user.role;
    }

    removeUser(user) {
        return;
    }
}
</script>
