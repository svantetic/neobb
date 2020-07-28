<template>
    <v-dialog :value="visible" width="400">
        <v-card>
            <v-card-title class="headline">{{ roleAction }} user</v-card-title>
            <v-card-text>
                Are you sure you want to {{ roleAction.toLowerCase() }}
                {{ user.username }}?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="hideDialog"
                    >Cancel</v-btn
                >
                <v-btn
                    color="green darken-1"
                    text
                    @click="changeUserRole(user)"
                    >{{ roleAction }}</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { ChangeUserRoleAction } from '../interfaces';
import { UserRoleMixin } from '../mixins';
@Component({
    mixins: [UserRoleMixin],
})
export default class ChangeRoleDialog extends Vue {
    @Prop(Boolean) visible: boolean = false;
    @Prop() user: {
        userame: string;
        role: string;
    };

    changeUserRole(user) {
        this.$emit('change-user-role', user);
    }

    hideDialog() {
        this.$emit('hide-change-role-dialog');
    }
}
</script>
