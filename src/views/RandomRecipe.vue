<template>
  <div class="home">
    <h1>Welcome to Random Recipe Page</h1>
    <button @click="homepage">Home Page</button>
    <button @click="login">Login Page</button>
    <button @click="randomrecipe">Random Recipe Page</button>
    <button @click="favorites">Favorite Recipes Page</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Homepage extends Vue {
  homepage(): void{
    this.$router.replace({path: '/'})
  }
  login(): void{
    this.$router.push({path: '/login'})
  }
  randomrecipe(): void{
    //already on this page
  }
  favorites(): void{
    this.$router.push({path: '/favorites'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
