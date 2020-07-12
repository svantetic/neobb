<template>
    <v-dialog :value="visible" width="400">
        <v-card>
            <v-card-title class="headline">Ban user</v-card-title>
            <v-card-text>
                Are you sure you want to ban
                {{ user.username }}?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="hideDialog"
                    >Cancel</v-btn
                >
                <v-btn color="green darken-1" text @click="banUser(user)"
                    >Ban</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop, Emit } from 'vue-property-decorator';

@Component
export default class BanDialog extends Vue {
    @Prop(Boolean) visible: boolean = false;
    @Prop() user: any;

    @Emit('hide-ban-dialog')
    hideDialog() {
        return;
    }

    banUser(user) {
        this.$emit('ban-user', user);
    }
}
</script>
