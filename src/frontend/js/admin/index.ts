import Vue from 'vue';
import AdminIndex from './AdminIndex.vue';
import VueRouter from 'vue-router';
import router from './router';

Vue.use(VueRouter);

new Vue({
    el: '#admin-index',
    template: '<AdminIndex />',
    components: {
        AdminIndex,
    },
    router,
});