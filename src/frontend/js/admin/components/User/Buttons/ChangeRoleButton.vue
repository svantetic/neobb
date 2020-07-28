<template>
    <v-btn
        xs
        color="primary"
        :disabled="isDisabled(user.role)"
        @click="showDialog"
    >
        {{ roleAction }}
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import { UserRoleMixin } from '../mixins';

@Component({
    mixins: [UserRoleMixin],
})
export default class ChangeRoleButton extends Vue {
    @Prop() user;

    isDisabled(role: string) {
        return role === 'ADMIN';
    }

    showDialog() {
        this.$emit('show-change-role-dialog', this.user);
    }
}
</script>
