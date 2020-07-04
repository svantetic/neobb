<template>
  <div>
      forum shape

      <ul v-if="segments.length > 0">
        <li v-for="segment in segments" :key="segment.id">
          {{ segment.name }}
        </li>
      </ul>

      <div v-else>
        Loading...
      </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class AdminStructure extends Vue {
  segments: [] = [];
  mounted() {
    fetch('/segment').then((response) => {
      return response.json();
    }).then((segments: any) => {
      this.segments = segments;
    })
  }
}
</script>

<style>

</style>