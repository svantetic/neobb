<template>
    <v-btn color="danger" @click="showBanDialog">
        Ban user
    </v-btn>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Emit, Prop } from 'vue-property-decorator';

@Component
export default class BanButton extends Vue {
    @Prop() user: any;
    @Emit('show-ban-dialog')
    showBanDialog() {
        return this.user;
    }
}
</script>
