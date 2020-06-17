import Vue from 'vue';
import PostForm from './components/PostForm.vue';

new Vue({
    el: '#post-form',
    template: '<PostForm />',
    components: {
        PostForm,
    },
})