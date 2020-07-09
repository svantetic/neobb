<template>
    <v-btn
        xs
        color="primary"
        :disabled="isDisabled(user.role)"
        @click="showDialog"
    >
        {{ buttonText }}
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class ChangeRoleButton extends Vue {
    @Prop() user;

    isDisabled(role: string) {
        return role === 'ADMIN';
    }

    get buttonText() {
        return this.user.role === 'ADMIN' ? 'Downgrade' : 'Promote';
    }

    showDialog() {
        this.$emit('show-change-role-dialog', this.user);
    }
}
</script>
