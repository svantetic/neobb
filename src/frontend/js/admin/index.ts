import Vue from 'vue';
import AdminIndex from './AdminIndex.vue';
import VueRouter from 'vue-router';
import router from './router';
import vuetify from '../plugins/vuetify';
import store from './store';

Vue.use(VueRouter);

new Vue({
    vuetify,
    store,
    el: '#admin-index',
    template: '<AdminIndex />',
    components: {
        AdminIndex,
    },
    router,
});
