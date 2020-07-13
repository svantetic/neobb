<template>
    <div>
        <v-form v-model="isValid" ref="form" @submit.prevent="addSection">
            <v-sheet class="pa-4 mb-5" elevation="1" v-if="active">
                <v-text-field
                    :rules="notBlank"
                    label="Name"
                    v-model="newSection.name"
                />
                <v-text-field
                    :rules="notBlank"
                    label="Description"
                    v-model="newSection.description"
                />
            </v-sheet>
            <v-btn type="submit" v-if="active" color="success">
                Submit
            </v-btn>
            <v-btn v-if="!active" color="primary" @click="showForm">
                Add section
            </v-btn>
            <v-btn color="secondary" v-else @click="hideForm">
                Cancel
            </v-btn>
        </v-form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import { Prop } from 'vue-property-decorator';

@Component
export default class SectionForm extends Vue {
    @Prop(Number) segment: number;
    $refs: {
        form: HTMLFormElement;
    };
    active: boolean = false;
    isValid: boolean = false;
    newSection: any = {
        name: '',
        description: '',
    };

    notBlank = [v => v.length > 0 || 'Field too short'];

    hideForm() {
        this.active = false;
    }

    showForm() {
        this.active = true;
    }

    async addSection() {
        this.$refs.form.validate();
        if (!this.isValid) {
            return;
        }
        const { name, description } = this.newSection;
        const response = await axios.post('/section', {
            name,
            description,
            segment: this.segment,
        });
        if (response.status) {
            this.$emit('section-created', response.data.section);
            this.newSection.name = '';
            this.newSection.description = '';
            this.active = false;
        }
    }
}
</script>
