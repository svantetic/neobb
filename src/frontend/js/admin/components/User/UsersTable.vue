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

                            <BanButton
                                v-if="isUser(user)"
                                @show-ban-dialog="showBanDialog"
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
            @change-user-role="promoteOrDowngrade"
            @hide-change-role-dialog="changeRoleDialog = false"
        />
        <!-- <DeactivateDialog /> -->
        <BanDialog
            :visible="banDialogVisible"
            :user="selectedUser"
            @ban-user="banUser"
            @hide-ban-dialog="banDialogVisible = false"
        />
        <v-snackbar
            v-if="selectedUser.username"
            color="success"
            v-model="notification"
            timeout="2000"
        >
            {{ notificationText }}
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
import BanButton from './Buttons/BanButton.vue';
import BanDialog from './Dialogs/BanDialog.vue';
import axios from 'axios';

@Component({
    components: {
        ChangeRoleButton,
        DeactivateButton,
        ChangeRoleDialog,
        DeactivateDialog,
        BanButton,
        BanDialog,
    },
})
export default class UsersTable extends Vue {
    @Prop() readonly users: Array<any>;
    statusDialog: boolean = false;
    changeRoleDialog: boolean = false;
    banDialogVisible: boolean = false;

    notification: boolean = false;
    notificationText: string = '';
    selectedUser: any = {};

    isUser(user) {
        return user.role === 'USER';
    }

    disableEdit(role: string) {
        return role === 'ADMIN';
    }

    showChangeRoleDialog(user) {
        this.changeRoleDialog = true;
        this.selectedUser = user;
    }

    showBanDialog(user) {
        this.banDialogVisible = true;
        this.selectedUser = user;
    }

    async banUser(user) {
        this.banDialogVisible = false;
        const { id } = user;
        const response = await axios.post('/admin/user/ban', {
            id,
        });

        this.notification = true;
        this.notificationText = `${user.username} banned`;
        this.$emit('user-banned', id);
    }

    changeStatus(user) {
        this.statusDialog = true;
        this.selectedUser = user;
    }

    async promoteOrDowngrade(user) {
        const { id, username, role } = user;
        const actionType = role === 'USER' ? 'promote' : 'downgrade';
        const response = await axios.post(`/admin/user/${actionType}`, {
            id,
            username,
            role,
        });

        this.selectedUser.role = response.data.user.role;
        this.notificationText = response.data.message;
        this.notification = true;
        this.$emit('user-role-changed', response.data.user);
        this.changeRoleDialog = false;
    }
}
</script>
