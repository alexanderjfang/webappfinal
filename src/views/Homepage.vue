<template>
  <div class = "home">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a id="login" @click="login">Login</a>
    </div>  
    <div class="main">
      <h1>Welcome to RandomRecipe</h1>
      <a>RandomRecipe helps take the decision making out of mealtime.  Use our
        page to find tasty, healthy, and easy to make recipies in no time.
        Our Random button will pick from any recipe on our list to get
        you started.  Then, if you log in, you can save and revisit your
        favorites at any time.  Don't like the randomness, no problem, you
        can select our All Recipes page to browse our entire selection of
        top quality recipes.</a>
        <div />
        <button> GET RANDOM!!!</button>
        <!-- IMPORTANT CITATION BELOW
          <h2>https://www.w3schools.com/howto/howto_css_fixed_menu.asp should be cited</h2>-->
        <!--<h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>
        <h2>this is to show how it scrolls</h2>-->

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import VueRouter from 'vue-router'

@Component
export default class Homepage extends Vue {
  homepage(): void{
    //already on this page
  }
  login(): void{
    this.$router.push({path: '/login'})
  }
  allrecipes(): void{
    this.$router.push({path: '/allrecipes'})
  }
  favorites(): void{
    this.$router.push({path: '/favorites'})
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  overflow: hidden;
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}

/* Links inside the navbar */
.navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}
.navbar a2 {
  float: center;
  display: block;
  color: #f2f2f2;
  text-align: center;
  font-size: 30px;
  padding: 8px 8px;
  text-decoration: none;
}



#login {
  float: right;
}

/* Change background on mouse-over */
.navbar a:hover {
  background: #ddd;
  color: black;
}
</style>
