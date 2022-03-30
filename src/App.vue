<template>
  <div id="app">
    <Homepage />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Homepage from './components/Homepage.vue';

@Component({
  components: {
    Homepage,
  },
})
export default class App extends Vue {}
</script>

<style>
</style>
