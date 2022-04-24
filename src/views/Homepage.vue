<template>
  <div class = "home">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a v-if="!loggedin" id="login" @click="login">Login</a>
      <a v-if="loggedin" id="login" @click="logout">Logout</a>
    </div>  
    <div class="main">
      <h1 class="title">Welcome to RandomRecipe</h1>
      <p>RandomRecipe helps take the decision making out of mealtime.  Use our
        page to find tasty, healthy, and easy to make recipies in no time.
        Our Random button will pick from any recipe on our list to get
        you started.  Then, if you log in, you can save and revisit your
        favorites at any time.  Don't like the randomness, no problem, you
        can select our All Recipes page to browse our entire selection of
        top quality recipes.</p>
        <div />
        <br>
        <button @click="getRandom"> GET RANDOM!!!</button>
        <!-- CITATION: <h2>https://www.w3schools.com/howto/howto_css_fixed_menu.asp should be cited</h2>-->
        <br>
        <br>
        <br>
        <img src="https://s23209.pcdn.co/wp-content/uploads/2019/10/Easy-Clam-ChowderIMG_1064.jpg" @click="goToFeature" width="250px" style="cursor:pointer">
        <p>Today's Feature: Clam Chowder</p>
    </div>
    <div class = "navbarbottom">
      <a @click="contactUs">Contact Us</a>
      <a @click="aboutUs">About Us</a>
    </div>
  </div>
</template>

<script lang="ts">
import { signOut, getAuth, User, Auth } from 'firebase/auth';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Homepage extends Vue {
  //LOGOUT LOGIC
  auth: Auth | null = null;
  loggedin = false;
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
  aboutUs(): void{
    this.$router.push({path: '/aboutUs'})
  }
  contactUs(): void{
    this.$router.push({path: '/contactUs'})
  }
  goToFeature(): void{
    this.$router.push({name: "le Singular Recipe Page", params: {singularRecipeID: "clamChowder"}})
  }
  //LOGOUT LOGIC
  logout(): void {
    if (this.auth) signOut(this.auth);
    this.loggedin=false;
    //console.log("logged out")
  }
  mounted():void{
    //LOGOUT LOGIC
    this.auth = getAuth();
    const user = this.auth.currentUser as User;
    const uid: string = this.auth.currentUser?.uid as string;
    if(uid==null){
      //user is not logged in
    }
    else{
      //user is logged in
      this.loggedin = true
    }
  }
  getRandom(): void{
    let foods: string[] = ['appleSauce', 'clamChowder', 'roastedChicken', 'toast'];
    let string: "singularRecipeID:";
    this.$router.push({name: "le Singular Recipe Page", params: {singularRecipeID:(foods[Math.floor(Math.random() * 4)])}})
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  overflow: hidden;
  background-color: rgb(46, 93, 146);
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
/* Links inside the navbar */
.home > * {
  text-align: center;
}
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
h1 {
  font-style: oblique;
}

.navbarbottom{

  overflow: hidden;
  background-color: rgb(46, 93, 146);
  position: fixed; /* Set the navbar to fixed position */
  bottom: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
.navbarbottom a{
  float: right;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}
.navbarbottom a:hover {
  background: #ddd;
  color: black;
}
p {
  padding-left: 25%;
  padding-right: 25%;
}
</style>