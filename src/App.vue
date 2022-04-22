<template>
  <div id="app">
    <h1>This is a header</h1>
    <router-view></router-view>
    <h1>This is the header after the router-view</h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Homepage from './views/Homepage.vue';

@Component({
  components: {
    Homepage,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
