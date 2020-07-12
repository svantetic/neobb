<template>
    <div v-if="!loading">
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
                    <Section
                        v-for="(section, i) in segment.sections"
                        :key="i"
                        :section="section"
                    />
                    <SectionForm
                        @section-created="addSection"
                        :segment="segment.id"
                    />
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
import Section from '../components/Section/Section.vue';
import SectionForm from '../components/Section/SectionForm.vue';

@Component({
    components: {
        Section,
        SectionForm,
    },
})
export default class AdminStructure extends Vue {
    segments: any[] = [];
    panel: number[] = [];
    sectionForm: boolean = false;
    loading: boolean = false;
    newSection = {
        name: '',
        description: '',
    };
    mounted() {
        this.loading = true;
        fetch('/segment')
            .then(response => {
                return response.json();
            })
            .then((segments: any) => {
                this.loading = false;
                this.segments = segments;
                this.panel = [...Array(this.segments.length).keys()].map(
                    (k, i) => i,
                );
            });
    }

    showSectionForm() {
        this.sectionForm = true;
    }

    addSection(section) {
        const { segment } = section;
        const segmentToAdd = this.segments.find(
            existingSegment => existingSegment.id === segment,
        );
        segmentToAdd.sections.push(section);
    }
}
</script>

<style></style>
