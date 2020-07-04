<template>
    <div class="flex flex-row">
        <div>
            <h1 class="p-4 text-4xl">NeoBB Admin</h1>
            <nav class="flex flex-col">
                <router-link class="p-4 mb-2" to="/dashboard">Dashboard</router-link>
                <router-link class="p-4 mb-2" to="/structure">Forum structure</router-link>
                <router-link class="p-4 mb-2" to="/users">Users</router-link>
                <router-link class="p-4 mb-2" to="/settings">Settings</router-link>
                <router-link class="p-4 mb-2" to="/stats">Stats</router-link>
            </nav>
        </div>
        <router-view class="p-4"/>
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