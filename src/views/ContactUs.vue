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
      <h1 class="title">Contact Us</h1>
      <a>Questions and concerns can be directed to the author emails:</a>
      <a>Benjamin Burkholder: </a>
      <a>Alexander Fang: </a>
      <a>Jay Aubry: aubryj@mail.gvsu.edu</a>
    </div>
    <div class = "navbarbottom">
      <bot @click="contactUs">Contact us</bot>
      <bot @click="aboutUs">About us</bot>
    </div>
  </div>
</template>

<script lang="ts">
import { signOut, getAuth, User, Auth } from 'firebase/auth';
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class AboutUs extends Vue {
  //LOGOUT LOGIC
  auth: Auth | null = null;
  loggedin = false;
  homepage(): void{
    this.$router.replace({path: '/'})
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
  contactUs(): void {
    //already on this page
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
.navbarbottom bot {
  overflow: hidden;
  background-color: rgb(46, 93, 146);
  position: fixed; /* Set the navbar to fixed position */
  bottom: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
}
.navbarbottom bot{
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 16px 16px;
  text-decoration: none;
}
.navbarbottom bot:hover {
  background: #ddd;
  color: black;
}
</style>