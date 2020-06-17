import VueRouter from 'vue-router';
import AdminDashboard from './components/AdminDashboard.vue';
import AdminForumShape from './components/AdminForumShape.vue';

const Router = new VueRouter({
    routes: [
        {
            path: '/admin/dashboard',
            component: AdminDashboard,
        },
        {
            path: '/admin/forum-shape',
            component: AdminForumShape,
        }
    ]
})

export default Router;