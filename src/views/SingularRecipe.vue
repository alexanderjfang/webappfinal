<template>
  <div class="singular">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a v-if="!loggedin" id="login" @click="login">Login</a>
      <a v-if="loggedin" id="login" @click="logout">Logout</a>
    </div>  
    <!--recipe data displayed below-->
    <br>
    <div id="picandmeta">
      <img id="food" :src = this.requestedRecipeData[7] width=250px>
      <div id="meta">
        <button v-if="!(this.userRecipeArray.indexOf(this.singularRecipeID) > -1)" @click="saveRecipeToUserFolder">Add to favorites</button>
        <button v-if="(this.userRecipeArray.indexOf(this.singularRecipeID) > -1)" @click="reloadArray">Remove from favorites</button>
        <p v-bind="{toString: () => this.timesFavorited}">Favorited by {{this.timesFavorited}} people</p>
        <p>{{requestedRecipeData[0]}} • feeds: {{requestedRecipeData[2]}}</p>
        <br>
          <div id="meta2">
            <img src = "http://www.clipartsuggest.com/images/364/orologio-clock-alarm-icon-coloring-book-colouring-coloring-book-9HZUv4-clipart.png" width=25px height=25px>
            <p>{{requestedRecipeData[8]}}</p>
          </div>          
      </div>
    </div>
    <h2>{{this.requestedRecipeData[6]}}</h2>
    <p>{{this.requestedRecipeData[1]}}</p>
    <h3>Ingredients</h3>
    <p>{{this.requestedRecipeData[4]}}</p>
    <h3>Instructions</h3>
    <p>{{this.requestedRecipeData[5]}}</p>
    <div class = "navbarbottom">
      <a @click="contactUs">Contact Us</a>
      <a @click="aboutUs">About us</a>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  getAuth,
  Auth,
  signOut,
  User,
} from "firebase/auth";
import { collection, CollectionReference, deleteDoc, doc, DocumentData, DocumentReference, DocumentSnapshot, Firestore, getDoc, getDocs, getFirestore, onSnapshot, QueryDocumentSnapshot, QuerySnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { firebaseConfig } from '@/myconfig';
import { FirebaseApp, initializeApp } from 'firebase/app';
const myApp:FirebaseApp = initializeApp(firebaseConfig);
const myDB:Firestore = getFirestore(myApp);
  
@Component
export default class Homepage extends Vue {
  //LOGOUT LOGIC
  auth: Auth | null = null;
  loggedin = false;
  userRecipeArray: DocumentData[] = []
  requestedRecipeData: DocumentData = []
  timesFavorited = 0
  @Prop() singularRecipeID!: string

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
  contactUs(): void{
    this.$router.push({path: '/contactUs'})
  }
  //LOGOUT LOGIC
  logout(): void {
    if (this.auth) signOut(this.auth);
    this.loggedin=false;
    //console.log("logged out")
  }
  saveRecipeToUserFolder(): void{
    //console.log("saving recipe to your folder")
    const auth = getAuth();
    const uid: string = auth.currentUser?.uid as string;
    if(uid == null){
      this.$router.push({path: '/login'})
    }
    else{
      const userFolder: DocumentReference = doc(myDB, 'userSaves/users')
      const recipe: DocumentReference = doc(myDB, "userSaves", "users", uid, this.requestedRecipeData[3])
      setDoc(recipe, {category: this.requestedRecipeData[0], description: this.requestedRecipeData[1], feeds: this.requestedRecipeData[2],
        id: this.requestedRecipeData[3], ingredients: this.requestedRecipeData[4], instructions: this.requestedRecipeData[5],
        name: this.requestedRecipeData[6], picture: this.requestedRecipeData[7], prepTime: this.requestedRecipeData[8]})
      //push the id to the local array so the button changes to remove from favorites
      let recipes:CollectionReference
      recipes = collection(myDB, 'userSaves', 'users', uid)
      getDocs(recipes).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
          this.userRecipeArray.push(qd.data().id)
        });
      });
    var requestedRecipeReference = doc( myDB, 'recipes', this.singularRecipeID )
    var requestedRecipe = getDoc(requestedRecipeReference).then((results) => {
      this.timesFavorited=results.data()?.favorited
      const doc1: DocumentReference = doc(myDB, 'recipes', this.singularRecipeID);
      let numb = 1 + this.timesFavorited;
      updateDoc(doc1, {favorited:numb});
      })  
    }
  }
  async removeRecipeFromUserFolder(){
    //insert logic to remove element from user database
    this.auth = getAuth();
    //const user = this.auth.currentUser as User;
    const uid: string = this.auth.currentUser?.uid as string;
    const d1: DocumentReference = doc(myDB, "userSaves", "users", uid, this.singularRecipeID)
    deleteDoc(d1)
    this.userRecipeArray = []
    var requestedRecipeReference = doc( myDB, 'recipes', this.singularRecipeID )
    var requestedRecipe = getDoc(requestedRecipeReference).then((results) => {
      this.timesFavorited=results.data()?.favorited
      const doc1: DocumentReference = doc(myDB, 'recipes', this.singularRecipeID);
      let numb = -1 + this.timesFavorited;
      updateDoc(doc1, {favorited:numb});
      })  
  }
  async clearArray(){
    await this.removeRecipeFromUserFolder()
    //this.auth = getAuth();
    //const user = this.auth.currentUser as User;
    //const uid: string = this.auth.currentUser?.uid as string;
    
  }
  async reloadArray(){
    await this.clearArray()
    this.auth = getAuth();
    //const user = this.auth.currentUser as User;
    const uid: string = this.auth.currentUser?.uid as string;
    let recipes:CollectionReference
    recipes = collection(myDB, 'userSaves', 'users', uid)
    getDocs(recipes).then((qs: QuerySnapshot) => {
     qs.forEach((qd: QueryDocumentSnapshot) => {
        this.userRecipeArray.push(qd.data().id)
      });
    });  
  }
  mounted(): void {
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
      //this logic is for checking the users recipes to determine whether
      //to display the add to favorites button or remove from favorites button
      //grab users data
      //get collection reference and add recipes to the array
      let recipes:CollectionReference
      recipes = collection(myDB, 'userSaves', 'users', uid)
      getDocs(recipes).then((qs: QuerySnapshot) => {
        qs.forEach((qd: QueryDocumentSnapshot) => {
          this.userRecipeArray.push(qd.data().id)
        });
      });  
    }
    //retrieve the recipe from the database
    let recipes:CollectionReference
    recipes = collection(myDB, 'recipes')
    var requestedRecipeReference = doc( myDB, 'recipes', this.singularRecipeID )
    var requestedRecipe = getDoc(requestedRecipeReference).then((results) => {
      this.requestedRecipeData = []
      this.requestedRecipeData.push(results.data()?.category)
      this.requestedRecipeData.push(results.data()?.description)
      this.requestedRecipeData.push(results.data()?.feeds)
      this.requestedRecipeData.push(results.data()?.id)
      this.requestedRecipeData.push(results.data()?.ingredients)
      this.requestedRecipeData.push(results.data()?.instructions)
      this.requestedRecipeData.push(results.data()?.name)
      this.requestedRecipeData.push(results.data()?.picture)
      this.requestedRecipeData.push(results.data()?.prepTime)
      this.requestedRecipeData.push(results.data()?.favorited)
      //console.log("recipe data: " + this.requestedRecipeData)
      //console.log("recipe id: " + this.singularRecipeID)
      })
      /*
      requestedRecipeData[0] = category
      requestedRecipeData[1] = description
      requestedRecipeData[2] = feeds
      requestedRecipeData[3] = id
      requestedRecipeData[4] = ingredients
      requestedRecipeData[5] = intructions
      requestedRecipeData[6] = name
      requestedRecipeData[7] = picture
      requestedRecipeData[8] = prepTime
      requestedRecipeData[9] = favorited
      */

      //set up listener for the single recipe to update favorited on change
      const mich = doc(myDB, "recipes", this.singularRecipeID);
      onSnapshot(mich, (ds: DocumentSnapshot) => {
      this.timesFavorited=ds.data()?.favorited
  });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.singular > * {
  text-align: center;
}
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
#meta {
  /* Needs to be adjusted because small screens cause overlap */
  margin-top: auto;
  /*flex: 0 1 auto;*/
  position: relative;
  left: 50%;
  transform: translateX(-100px);
  text-align: left;
  width: 200px;
}
#meta2{
  display: flex;
}
#picandmeta {
  display: flex;
  z-index: -5000;
}
#picandmeta > img {
  flex: 0 1 auto;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  /*citation: https://stackoverflow.com/questions/33444666/how-to-center-align-one-flex-item-and-right-align-another-using-flexbox*/
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
button{
  border-color: rgb(46, 93, 146);
  background-color: rgb(226, 226, 226);
  color: black;
  border-radius: 25px;
}
#food{
  border-style: solid;
  border-color: rgb(46, 93, 146);
}
</style>