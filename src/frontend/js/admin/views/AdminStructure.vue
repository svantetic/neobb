<template>
    <div v-if="!loading">
        <v-expansion-panels multiple v-model="segmentMapForPanel">
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
                                    @click.stop="applyRename"
                                    >Apply</v-btn
                                >
                                <v-btn text @click.stop="hideRename">
                                    Cancel
                                </v-btn>
                            </template>
                        </v-col>
                        <v-col cols="2">
                            <v-btn
                                v-if="rename.id !== segment.id"
                                text
                                @click.stop="showDeleteSegmentDialog(segment)"
                                color="red"
                            >
                                Delete
                            </v-btn>
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
            <SegmentForm />
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
        <Notification />
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
import Notification from '../components/Common/Notification.vue';
import axios from 'axios';
import API from '../api';
import { Getter, Action } from 'vuex-class';

@Component({
    components: {
        Section,
        SectionForm,
        SegmentForm,
        Notification,
    },
})
export default class AdminStructure extends Vue {
    @Getter('segment/segments') segments;
    @Action('segment/setSegments') setSegments: (segments) => void;
    @Action('segment/deleteSegment') removeDeletedSegment: (id: number) => void;
    @Action('segment/addSection') addSection: (section) => void;
    @Action('segment/renameSegment') renameSegment: (payload: {
        id: number;
        name: string;
    }) => void;
    @Action('notification/show') showNotification: (text: string) => void;

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
    newSection = {
        name: '',
        description: '',
    };

    async mounted() {
        this.loading = true;
        const segments = await API.fetchSegments();
        this.setSegments(segments);
        this.loading = false;
    }

    get segmentMapForPanel(): number[] {
        return [...Array(this.segments.length).keys()].map((k, i) => i);
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

    async applyRename() {
        try {
            const { id, segmentName } = this.rename;
            const response = await API.renameSegment(id, segmentName);
            this.showNotification('Segment renamed');
            this.renameSegment({
                id,
                name: segmentName,
            });
            this.hideRename();
        } catch (error) {
            this.showNotification(error);
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
            const deleted = await API.deleteSegment(id, name);
            this.showNotification('Segment deleted');
            this.removeDeletedSegment(id);
        } catch (error) {
            this.showNotification(error);
        }
        this.hideDeleteSegmentDialog();
    }

    hideDeleteSegmentDialog() {
        this.deleteSegmentDialog.visible = false;
        this.deleteSegmentDialog.segment.name = '';
        this.deleteSegmentDialog.segment.id = '';
    }
}
</script>

<style></style>
