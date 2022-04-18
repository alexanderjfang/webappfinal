<template>
  <div id="app">
    <p>  without this paragraph, the menu bar covers headers </p>
    <router-view></router-view>
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
