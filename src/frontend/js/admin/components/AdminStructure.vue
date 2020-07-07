<template>
    <div v-if="segments.length > 0">
        Forum shape
        <v-expansion-panels multiple v-model="panel">
            <v-expansion-panel
                mandatory
                v-for="(segment, i) in segments"
                :key="i"
            >
                <v-expansion-panel-header class="text-h4">
                    {{ segment.name }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                    <div v-for="section in segment.sections" :key="section.id">
                        <p class="text-subtitle-1">{{ section.name }}</p>
                        <p class="text-subtitle-2">{{ section.description }}</p>
                    </div>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
    <div v-else>
        Loading...
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AdminStructure extends Vue {
    segments: [] = [];
    panel: number[] = [];
    mounted() {
        fetch('/segment')
            .then(response => {
                return response.json();
            })
            .then((segments: any) => {
                this.segments = segments;
                this.panel = [...Array(this.segments.length).keys()].map(
                    (k, i) => i,
                );
            });
    }
}
</script>

<style></style>
