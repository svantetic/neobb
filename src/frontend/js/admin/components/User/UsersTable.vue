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
        <Notification />
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
import Notification from '../Common/Notification.vue';
import axios from 'axios';
import API from '../../api';
import { Action } from 'vuex-class';
import { UserRolePayload } from './interfaces';

@Component({
    components: {
        ChangeRoleButton,
        DeactivateButton,
        ChangeRoleDialog,
        DeactivateDialog,
        BanButton,
        BanDialog,
        Notification,
    },
})
export default class UsersTable extends Vue {
    @Prop() readonly users: Array<any>;
    statusDialog: boolean = false;
    changeRoleDialog: boolean = false;
    banDialogVisible: boolean = false;
    selectedUser: any = {};

    @Action('user/deleteUser') deleteUser: (id: number) => void;
    @Action('user/changeRole') changeRole: (user: UserRolePayload) => void;
    @Action('notification/show') showNotification: (text: string) => void;

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
        const response = await API.banUser(user.id);

        if (response) {
            this.showNotification(response.data.message);
            this.deleteUser(response.data.user.id);
        }
    }

    changeStatus(user) {
        this.statusDialog = true;
        this.selectedUser = user;
    }

    async promoteOrDowngrade(user) {
        const { id, username, role } = user;

        const response = await API.changeRole(id, username, role);

        if (response) {
            this.selectedUser.role = response.data.user.role;
            this.showNotification(response.data.message);
            this.changeRole(response.data.user);
            this.changeRoleDialog = false;
        }
    }
}
</script>
