<template>
    <div>
        <nav>
            <router-link to="/admin/dashboard">Dashboard</router-link>
            <router-link to="/admin/forum-shape">Forum shape</router-link>
        </nav>
        <router-view>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';


@Component
export default class AdminIndex extends Vue {

}
</script>

<style>

</style>