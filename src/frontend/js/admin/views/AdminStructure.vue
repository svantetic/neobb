<template>
    <div v-if="!loading">
        <v-expansion-panels multiple v-model="panel">
            <v-expansion-panel
                mandatory
                :readonly="readonly"
                v-for="(segment, i) in segments"
                :key="i"
            >
                <v-expansion-panel-header class="text-h4">
                    <v-row no-gutters>
                        <v-col cols="8">
                            <template v-if="rename.id === segment.id">
                                <v-text-field
                                    @click.stop
                                    v-model="rename.segmentName"
                                />
                            </template>
                            <template v-else>
                                {{ segment.name }}
                            </template>
                        </v-col>
                        <v-col cols="2">
                            <v-btn
                                v-if="rename.id !== segment.id"
                                @click.stop="showRename(segment)"
                                text
                            >
                                Rename
                            </v-btn>
                            <template v-else>
                                <v-btn
                                    text
                                    color="primary"
                                    @click.stop="renameSegment"
                                    >Apply</v-btn
                                >
                                <v-btn text @click.stop="hideRename"
                                    >Cancel</v-btn
                                >
                            </template>
                        </v-col>
                        <v-col cols="2">
                            <v-btn
                                v-if="rename.id !== segment.id"
                                text
                                @click.stop="showDeleteSegmentDialog(segment)"
                                color="red"
                                >Delete</v-btn
                            >
                        </v-col>
                    </v-row>
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
            <SegmentForm @segment-created="addCreatedSegment" />
        </v-expansion-panels>
        <v-dialog max-width="320" v-model="deleteSegmentDialog.visible">
            <v-card>
                <v-card-title>Delete segment</v-card-title>
                <v-card-text
                    >Are you sure you want to delete segment
                    {{ deleteSegmentDialog.segment.name }}?</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn @click="hideDeleteSegmentDialog" text>Cancel</v-btn>
                    <v-btn @click="deleteSegment" text color="primary"
                        >Delete</v-btn
                    >
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar color="success" v-model="notification" timeout="2000">
            {{ notificationText }}
        </v-snackbar>
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
import SegmentForm from '../components/Segment/SegmentForm.vue';
import axios from 'axios';
import { log } from 'util';

@Component({
    components: {
        Section,
        SectionForm,
        SegmentForm,
    },
})
export default class AdminStructure extends Vue {
    segments: any[] = [];
    panel: number[] = [];
    sectionForm: boolean = false;
    loading: boolean = false;
    readonly: boolean = false;
    rename: {
        id: number;
        segmentName: string;
    } = {
        id: null,
        segmentName: '',
    };
    deleteSegmentDialog = {
        visible: false,
        segment: {
            name: '',
            id: null,
        },
    };
    notification: boolean = false;
    notificationText: string = '';
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

    showRename(segment) {
        this.readonly = true;
        this.rename.id = segment.id;
        this.rename.segmentName = segment.name;
    }

    hideRename() {
        this.rename.id = null;
        this.rename.segmentName = '';
        this.readonly = false;
    }

    async renameSegment() {
        try {
            const response = await axios.patch(`/segment/${this.rename.id}`, {
                name: this.rename.segmentName,
            });
            if (response.data.statusCode === 200) {
                this.notification = true;
                this.notificationText = 'Segment renamed';
                this.updateSegment();
                this.hideRename();
            }
        } catch (error) {
            this.notification = true;
            this.notificationText = error;
        }
    }

    showDeleteSegmentDialog(segment) {
        const { name, id } = segment;
        this.deleteSegmentDialog.visible = true;
        this.deleteSegmentDialog.segment = {
            name,
            id,
        };
    }

    async deleteSegment() {
        const { id, name } = this.deleteSegmentDialog.segment;
        try {
            const response = await axios.delete('/segment', {
                data: {
                    id,
                    name,
                },
            });

            if (response.data.statusCode === 200) {
                this.notification = true;
                this.notificationText = 'Segment deleted';
                this.removeDeletedSegment(this.deleteSegmentDialog.segment);
            } else {
                this.notification = true;
                this.notificationText = response.statusText;
            }
        } catch (error) {
            this.notification = true;
            this.notificationText = error.message;
        }
        this.hideDeleteSegmentDialog();
    }

    hideDeleteSegmentDialog() {
        this.deleteSegmentDialog.visible = false;
        this.deleteSegmentDialog.segment.name = '';
        this.deleteSegmentDialog.segment.id = '';
    }

    addSection(section) {
        console.log('should add section', section);
        const { segment } = section;
        const segmentToAdd = this.segments.find(
            existingSegment => existingSegment.id === segment,
        );
        console.log(segmentToAdd);
        segmentToAdd.sections.push(section);
    }

    addCreatedSegment(segment) {
        const newSegment = {
            ...segment,
            sections: [],
        };
        this.segments.push(newSegment);
    }

    removeDeletedSegment(segment) {
        const indexToRemove = this.segments.findIndex(
            existing => existing.id === segment.id,
        );
        console.log(indexToRemove);
        if (indexToRemove > -1) {
            this.segments.splice(indexToRemove, 1);
        }
    }

    updateSegment() {
        const toUpdate = this.segments.find(
            existing => existing.id === this.rename.id,
        );
        if (!toUpdate) {
            return;
        }

        toUpdate.name = this.rename.segmentName;
    }
}
</script>

<style></style>
