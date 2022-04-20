<template>
  <div class="favorites">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a v-if="!loggedin" id="login" @click="login">Login</a>
      <a v-if="loggedin" id="login" @click="logout">Logout</a>
    </div>
    <h1>Your Favorites</h1>
    <p v-if="!loggedin">Login to see your favorites!</p>
     <!-- Below is the table full of recipes -->
    <table v-if="loggedin">
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Category</th>
        <th>Feeds</th>
        <th>Prep Time</th>
      </tr>
      <tr v-for="(u,pos) in userRecipeArray" :key="pos">
            <td><a @click="singularrecipe(u.id)"><img :src="u.picture" style="width:200px"></a></td>
            <td><a @click="singularrecipe(u.id)" style="color:blue;text-decoration:underline">{{u.name}}</a></td>
            <td>{{u.category}}</td>
            <td>{{u.feeds}}</td>
            <td>{{u.prepTime}}</td>
        </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { firebaseConfig } from '@/myconfig';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth, signOut, User } from 'firebase/auth';
import { collection, CollectionReference, DocumentData, Firestore, getDocs, getFirestore, QueryDocumentSnapshot, QuerySnapshot } from 'firebase/firestore';
import { Component, Vue } from 'vue-property-decorator';

const myApp:FirebaseApp = initializeApp(firebaseConfig);
const myDB:Firestore = getFirestore(myApp);

@Component
export default class Homepage extends Vue {
  //LOGOUT LOGIC
  auth: Auth | null = null;
  loggedin = false;
  //create array for storing the recipes
  userRecipeArray: DocumentData[] = []
  
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
    //already on this page
  }

  //LOGOUT LOGIC
  logout(): void {
    if (this.auth) signOut(this.auth);
    this.loggedin=false;
    //console.log("logged out")
  }

  mounted(): void{
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

      //grab users data
      //get collection reference and add recipes to the array
      let recipes:CollectionReference
      recipes = collection(myDB, 'userSaves', 'users', uid)
      getDocs(recipes).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
          this.userRecipeArray.push(qd.data())
        });
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.favorites > * {
  text-align: center;
}

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

table{
  margin-left: auto;
  margin-right: auto;
}

th{
  min-width: 200px;
  outline-style: solid;
  outline-width: 2px;
}

td{
  outline-style: solid;
  outline-width: 2px;
}
</style>
