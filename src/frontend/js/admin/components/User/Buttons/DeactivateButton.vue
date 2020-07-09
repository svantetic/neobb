<template>
    <v-btn
        xs
        color="secondary"
        :disabled="disableEdit(user.role)"
        @click.stop="changeStatus(user)"
        >{{ user.active ? 'Deactivate' : 'Activate' }}</v-btn
    >
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class DeactivateButton extends Vue {}
</script>
