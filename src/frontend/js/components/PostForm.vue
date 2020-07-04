<template>
  <form @submit="handleSubmit">
    <label for="content" class="block">Content</label>
    <textarea
      v-model="content"
      required
      class="shadow-xl block w-full mb-10 p-4"
      id="content"
      cols="{30}"
      rows="{10}"
      name="content"
    ></textarea>
    <Button type="submit">Reply</Button>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Button from '../common/Button.vue';

declare global {
  interface Window {
    threadId: string | number;
  }
}

@Component({
  components: { Button },
})
export default class PostForm extends Vue {
  content: string = '';

  async handleSubmit(event: Event) {
    event.preventDefault();
    try {
      const response = await fetch('/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: this.content,
          threadId: window.threadId,
        }),
      });
      if (response.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
    }
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
