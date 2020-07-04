import Vue from 'vue';
import PostForm from './PostForm.vue';

new Vue({
    el: '#post-form',
    template: '<PostForm />',
    components: {
        PostForm,
    },
})