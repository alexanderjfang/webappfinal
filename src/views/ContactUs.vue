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
      <p>If you have questions and concerns please reach out to us. We are always looking for ways to improve the RandomRecipe experience.  The following are all ways to provide feedback:</p>
      <br>
      <p id="address">RandomRecipe<br>123 Main St.<br>Muskegon, MI 49442</p>      
      <p>feedback@RandomRecipe.com</p>
      <p>231-275-1525</p>
      <br>
      <h2>Post a Recipe</h2>
      <p>Help make the site better by providing your personal recipies.  While we can't promise every submitted recipe will make it on the site, we will evaluate every submission.  We strive to keep the site ballanced so we are especially interested in recipes in the catagories that are underrepresented. </p>
    </div>
    <div id="chart">
      <canvas id="myChart"></canvas>
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
import Chart from 'chart.js/auto';
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
    const ctx = 'myChart';
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Entree', 'Snack', 'Breakfast'],
        datasets: [{
            label: '# of Recipes by Category',
            data: [2, 2, 1],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)'                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        // maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                suggestedMax: 5,
                ticks: {
                  precision: 0

                }

            }
        },
        maintainAspectRatio:false,
        // layout:{
        //   padding:250
        // }
    }
});
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
#address p {
  padding: 0%;
  margin:0px;
  line-height: .75em;
}
#chart {
  height: 50%;
  width: 50%;
  margin: 0 auto;

}
</style>