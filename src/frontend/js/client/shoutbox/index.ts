import Vue from 'vue';
import Shoutbox from './Shoutbox.vue';

new Vue({
    el: '#shoutbox',
    template: '<Shoutbox />',
    components: {
        Shoutbox,
    },
})