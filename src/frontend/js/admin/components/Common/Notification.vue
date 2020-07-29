<template>
    <v-snackbar :value="active" @input="hide" :timeout="timeout">
        {{ text }}
    </v-snackbar>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Action } from 'vuex-class';

@Component
export default class Notification extends Vue {
    @Getter('notification/active') active;
    @Getter('notification/timeout') timeout;
    @Getter('notification/text') text;
    @Action('notification/hide') hide: () => void;
}
</script>
