<template>
    <v-dialog v-model="statusDialog" width="400">
        <v-card>
            <v-card-title class="headline">Promote user</v-card-title>
            <v-card-text>
                Are you sure you want to disable
                {{ selectedUser.username }}?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" text @click="statusDialog = false"
                    >Cancel</v-btn
                >
                <v-btn
                    color="green darken-1"
                    text
                    @click="changeStatus(selectedUser)"
                    >Promote</v-btn
                >
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class DeactivateDialog extends Vue {}
</script>
