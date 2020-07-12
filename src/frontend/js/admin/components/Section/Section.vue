<template>
    <v-sheet class="pa-4 mb-3" elevation="1">
        <p class="text-subtitle-1">{{ section.name }}</p>
        <p class="text-subtitle-2">{{ section.description }}</p>
    </v-sheet>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class Section extends Vue {
    @Prop() section: any;
    newSection: any = { name: '', description: '' };
    sectionForm: boolean = false;
}
</script>
