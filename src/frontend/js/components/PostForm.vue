<template>
    <form @submit="handleSubmit">
        <label for="content" class="block">Content</label>
        <textarea v-model="content" required class="shadow-xl block w-full mb-10 p-4" id="content" cols={30} rows={10} name="content"></textarea>
        <Button @button-click="createPost">Reply</Button>
    </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Button from '../common/Button.vue';
@Component({
    components: { Button }
})
export default class PostForm extends Vue {
    content: string = '';

    handleSubmit(event: Event) {
        event.preventDefault();
    }

    createPost() {
        console.log('should create post with', this.content);
    }
}
</script>

<style scoped>
    p {
        color: red;
    }
</style>
