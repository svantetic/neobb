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
                            <ChangeRoleButton
                                @show-change-role-dialog="showChangeRoleDialog"
                                :user="user"
                            />
                            <!-- <DeactivateButton/> -->
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <ChangeRoleDialog
            :visible="changeRoleDialog"
            :user="selectedUser"
            @change-user-role="promoteUser"
            @hide-change-role-dialog="changeRoleDialog = false"
        />
        <!-- <DeactivateDialog /> -->
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
import ChangeRoleButton from './Buttons/ChangeRoleButton.vue';
import DeactivateButton from './Buttons/DeactivateButton.vue';
import ChangeRoleDialog from './Dialogs/ChangeRoleDialog.vue';
import DeactivateDialog from './Dialogs/DeactivateDialog.vue';
import axios from 'axios';

@Component({
    components: {
        ChangeRoleButton,
        DeactivateButton,
        ChangeRoleDialog,
        DeactivateDialog,
    },
})
export default class UsersTable extends Vue {
    @Prop() readonly users: Array<any>;
    statusDialog: boolean = false;
    changeRoleDialog: boolean = false;
    notification: boolean = false;
    selectedUser: any = {};

    disableEdit(role: string) {
        return role === 'ADMIN';
    }
    showChangeRoleDialog(user) {
        this.changeRoleDialog = true;
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
        this.changeRoleDialog = false;
    }
}
</script>
