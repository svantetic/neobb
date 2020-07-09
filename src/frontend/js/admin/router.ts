import VueRouter from 'vue-router';
import AdminDashboard from './components/AdminDashboard.vue';
import AdminStructure from './components/AdminStructure.vue';
import UsersView from './views/UsersView.vue';

const Router = new VueRouter({
    routes: [
        {
            path: '/dashboard',
            component: AdminDashboard,
        },
        {
            path: '/structure',
            component: AdminStructure,
        },
        {
            path: '/users',
            component: UsersView,
        },
    ],
});

export default Router;
