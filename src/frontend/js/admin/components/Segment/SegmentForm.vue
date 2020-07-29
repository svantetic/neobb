<template>
    <div>
        <v-btn
            fixed
            fab
            bottom
            right
            @click="active = true"
            v-if="!active"
            color="primary"
            class="fab-button"
        >
            <v-icon>
                add
            </v-icon>
        </v-btn>

        <v-dialog width="400" v-else :value="active">
            <v-card>
                <v-card-title class="headline">Add segment</v-card-title>
                <v-form ref="form" @submit="createSegment" v-model="valid">
                    <v-card-text>
                        <v-text-field v-model="newSegment.name" label="Name" />
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn type="submit" color="secondary">Create</v-btn>
                        <v-btn text @click="active = false">Cancel</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<style scoped>
.fab-button {
    bottom: 100px;
    margin-bottom: 50px;
}
</style>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { Action } from 'vuex-class';
import API from '../../api';

@Component
export default class SegmentForm extends Vue {
    active: boolean = false;
    $refs: {
        form: any;
    };
    valid: boolean = false;
    newSegment: {
        name: string;
    } = {
        name: '',
    };

    @Action('segment/add') addSegment: (segment: any) => void;

    async createSegment() {
        this.$refs.form.validate();
        if (!this.valid) {
            return;
        }

        this.addSegment(await API.addSegment(this.newSegment.name));
        this.active = false;
    }
}
</script>
