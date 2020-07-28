import { Module } from 'vuex';

interface SegmentModuleState {
    segments: any[];
}

const ADD_SEGMENT = 'ADD_SEGMENT';
const REMOVE_SEGMENT = 'REMOVE_SEGMENT';
const UPDATE_SEGMENT = 'UPDATE_SEGMENT';
const SET_SEGMENTS = 'SET_SEGMENTS';
const ADD_SECTION_TO_SEGMENT = 'ADD_SECTIONT_TO_SEGMENT';

export const segment: Module<SegmentModuleState, any> = {
    namespaced: true,
    state: {
        segments: [],
    },
    getters: {
        segments(state) {
            return state.segments;
        },
    },
    mutations: {
        [ADD_SEGMENT](state, segment) {
            state.segments.push(segment);
        },

        [ADD_SECTION_TO_SEGMENT](state, section) {
            const { segment } = section;
            const segmentToAdd = state.segments.find(
                existingSegment => existingSegment.id === segment,
            );
            segmentToAdd.sections.push(section);
        },

        [SET_SEGMENTS](state, segment) {
            state.segments = segment;
        },

        [REMOVE_SEGMENT](state, id: number) {
            const indexToRemove = state.segments.findIndex(
                existing => existing.id === id,
            );

            if (indexToRemove > -1) {
                state.segments.splice(indexToRemove, 1);
            }
        },

        [UPDATE_SEGMENT](state, payload: { id: number; name: string }) {
            const toUpdate = state.segments.find(
                existing => existing.id === payload.id,
            );

            if (!toUpdate) {
                return;
            }

            toUpdate.name = payload.name;
        },
    },

    actions: {
        setSegments({ commit }, segments) {
            commit(SET_SEGMENTS, segments);
        },

        deleteSegment({ commit }, id: number) {
            commit(REMOVE_SEGMENT, id);
        },

        renameSegment({ commit }, payload: { id: number; name: string }) {
            commit(UPDATE_SEGMENT, payload);
        },

        addSegment({ commit }, segment) {
            const newSegment = segment.hasOwnProperty('sections')
                ? {
                      ...segment,
                  }
                : {
                      ...segment,
                      sections: [],
                  };

            commit(ADD_SEGMENT, newSegment);
        },

        addSection({ commit }, section) {
            commit(ADD_SECTION_TO_SEGMENT, section);
        },
    },
};
