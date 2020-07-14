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
        >
            <v-icon>
                add
            </v-icon>
        </v-btn>

        <v-form ref="form" v-else v-model="valid">
            <v-text-field v-model="newSegment.name" label="Name" />
            <v-btn @click="createSegment" color="secondary">Create</v-btn>
            <v-btn @click="active = false">Cancel</v-btn>
        </v-form>
    </div>
</template>

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

    @Action('addSegment') addSegment: (segment: any) => void;

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
