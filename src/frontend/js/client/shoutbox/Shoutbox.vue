<template>
  <div class="container mx-auto py-6 px-4 my-4">
    <div class="shoutbox__messages">
      <p v-for="message in messages" :key="message.id">
        {{ message }}
      </p>
    </div>
    <form @submit.prevent="sendMessage">
        <div class="flex flex-row align-center justify-between">
          <input
            type="text"
            v-model="message"
            class="shadow-xl w-full px-2 py-2 mr-12"
            placeholder="Message"
            id="message"
            autocomplete="off"
            cols="{30}"
            rows="{10}"
            name="message"
            @keydown.enter="sendMessage"
          />
          <Button class="w-24" :disabled="!message.length" type="submit">Send</Button>
        </div>
    </form>
  </div>
</template>

<script lang="ts">
import Button from '../../common/Button.vue';
const io = require('socket.io-client');
import Vue from 'vue'
import { log } from 'util';

export default Vue.extend({
  name: "Shoutbox",
  components: {
    Button,
  },
  data: () => ({
    message: '',
    messages: [''],
    socket: null,
  }),
  methods: {
    sendMessage(event: Event) {
      this.socket.emit('message', this.message);
      this.message = '';
    },

    receiveMessage(msg: string) {
      this.messages.push(msg);
    }
  },

  created() {
    this.socket = io('http://localhost:8080');
    this.socket.on('message', (msg) => {
      this.receiveMessage(msg);
    })
  }
})
</script>