<template>
  <div class = "about">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a v-if="!loggedin" id="login" @click="login">Login</a>
      <a v-if="loggedin" id="login" @click="logout">Logout</a>
    </div>  
    <div class="main">
      <h1 class="title">About Us</h1>
      <p>Alex Fang, Ben Burkholder, and Jay Aubry are amateur cooks trying to make mealtime easier for everyone.  We think that simple, easy to make recipes should be available in one place without excessive ads and irrelevant backstories.  We are always interested in improving our site, if you have any recipes to add or suggestions please visit our <a @click="contactUs" style="color:blue;text-decoration:underline;cursor:pointer">Contact Us</a> page.</p> 
      <br>
      <p>We are busy GVSU students trying to help out our fellow man.  Hopefully you enjoy the site and find some good recipes.</p>
      <br>
      <br>
      <img id="us" src="https://cdn.discordapp.com/attachments/943889055165345926/967827524237267024/unknown.png">
      <img id="gvlogo" src="https://images-ext-2.discordapp.net/external/PDu7hfOtbas13nfOyg2kJU7ZGpdOLpGD7xaaNRlzraM/https/upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Grand_Valley_State_Lakers_logo.svg/1200px-Grand_Valley_State_Lakers_logo.svg.png">
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
    //already on this page
  }
  contactUs(): void {
    this.$router.push({path: '/contactUs'})
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
.about > * {
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
.navbarbottom {
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
#gvlogo {
  width: 13%;
  height: 13%;
}
#us{
  border-style:solid;
  border-color: rgb(46, 93, 146);
}
</style>