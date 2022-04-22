<template>
  <div id="app">
    <br>
    <br>
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