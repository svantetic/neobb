<template>
    <div>
        <v-simple-table>
            <template v-slot:default>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Registered</th>
                        <th>Updated</th>
                        <th>Active?</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(user, i) in users" :key="i">
                        <td>{{ user.username }}</td>
                        <th>{{ user.email }}</th>
                        <td>{{ user.role }}</td>
                        <td>{{ user.createdAt }}</td>
                        <td>{{ user.updatedAt }}</td>
                        <td>{{ user.active }}</td>
                        <td>
                            <v-btn
                                xs
                                color="primary"
                                :disabled="disableEdit(user.role)"
                                @click="changeRole(user)"
                            >
                                {{
                                    user.role === 'USER'
                                        ? 'Promote'
                                        : 'Downgrade'
                                }}</v-btn
                            >
                            <v-btn
                                xs
                                color="secondary"
                                :disabled="disableEdit(user.role)"
                                @click.stop="changeStatus(user)"
                                >{{
                                    user.active ? 'Deactivate' : 'Activate'
                                }}</v-btn
                            >
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-dialog v-model="promoteDialog" width="400">
            <v-card>
                <v-card-title class="headline">Promote user</v-card-title>
                <v-card-text>
                    Are you sure you want to promote
                    {{ selectedUser.username }}?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        color="red darken-1"
                        text
                        @click="promoteDialog = false"
                        >Cancel</v-btn
                    >
                    <v-btn
                        color="green darken-1"
                        text
                        @click="promoteUser(selectedUser)"
                        >Promote</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-snackbar
            v-if="selectedUser.username"
            color="success"
            v-model="notification"
            timeout="2000"
        >
            {{ selectedUser.username }} promoted to {{ selectedUser.role }}
        </v-snackbar>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios from 'axios';

@Component({
    components: {
        EditForm,
    },
})
export default class UsersTable extends Vue {
    @Prop() readonly users: Array<any>;
    statusDialog: boolean = false;
    promoteDialog: boolean = false;
    notification: boolean = false;
    selectedUser: any = {};

    disableEdit(role: string) {
        return role === 'ADMIN';
    }
    changeRole(user) {
        this.promoteDialog = true;
        this.selectedUser = user;
    }

    changeStatus(user) {
        this.statusDialog = true;
        this.selectedUser = user;
    }

    async promoteUser(user) {
        const { id, username, role } = user;
        const response = await axios.post('/admin/user/promote', {
            id,
            username,
            role,
        });

        this.selectedUser.role = response.data.user.role;
        this.notification = true;
        this.$emit('user-promoted', response.data.user);
        this.promoteDialog = false;
    }
}
</script>
