<template>
    <p>
        {{ greeting }}
    </p>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class PostForm extends Vue {
    greeting = 'test';
}
</script>

<style scoped>
    p {
        color: red;
    }
</style>
