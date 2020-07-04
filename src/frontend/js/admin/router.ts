import VueRouter from 'vue-router';
import AdminDashboard from './components/AdminDashboard.vue';
import AdminStructure from './components/AdminStructure.vue';

const Router = new VueRouter({
    routes: [
        {
            path: '/dashboard',
            component: AdminDashboard,
        },
        {
            path: '/structure',
            component: AdminStructure,
        }
    ]
})

export default Router;