<template>
    <v-app>
        <v-navigation-drawer permanent app clipped>
            <v-list>
                <v-list-item link to="/dashboard">
                    <v-list-item-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/structure">
                    <v-list-item-action>
                        <v-icon>table_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Structure</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/users">
                    <v-list-item-action>
                        <v-icon>group</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Users</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/settings">
                    <v-list-item-action>
                        <v-icon>settings</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Settings</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/stats">
                    <v-list-item-action>
                        <v-icon>bar_chart</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Statistics</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar app clipped-left>
            <v-toolbar-title>NeoBB Admin</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-container fluid>
                <v-row>
                    <v-col>
                        <router-view />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
        <v-footer inset app>
            <span>NeoBB &copy; {{ new Date().getFullYear() }}</span>
        </v-footer>
    </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AdminIndex extends Vue {
    drawer: any = null;
    created() {
        this.$vuetify.theme.dark = false;
    }
}
</script>
