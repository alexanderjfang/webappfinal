<template>
  <div class="singular">
    <div class="navbar">
      <a @click="homepage">Home</a>      
      <a @click="allrecipes">All Recipes</a>
      <a @click="favorites">Favorite Recipes</a>  
      <!-- <a2 id="title"> RandomRecipe </a2> -->
      <a id="login" @click="login">Login</a>
    </div>  
    <!--recipe data displayed below-->
    <br>
    <div id="picandmeta">
      <img :src = this.requestedRecipeData[7] width=250px>
      <div id="meta">
        <button @click="saveRecipeToUserFolder" id="favbutton">Add to favorites</button>
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
    <h2>Ingredients</h2>
    <p>{{this.requestedRecipeData[4]}}</p>
    <h2>Instructions</h2>
    <p>{{this.requestedRecipeData[5]}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  getAuth,
  Auth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GithubAuthProvider,
  sendEmailVerification,
  signOut,
  signInWithRedirect,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, CollectionReference, doc, DocumentData, DocumentReference, Firestore, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '@/myconfig';
import { FirebaseApp, initializeApp } from 'firebase/app';

const myApp:FirebaseApp = initializeApp(firebaseConfig);
const myDB:Firestore = getFirestore(myApp);

@Component
export default class Homepage extends Vue {
  requestedRecipeData: DocumentData = []
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

  saveRecipeToUserFolder(): void{
    console.log("saving recipe to your folder")
    const auth = getAuth();
    const uid: string = auth.currentUser?.uid as string;
    if(uid == null){
      this.$router.push({path: '/login'})
    }
    else{
      const userFolder: DocumentReference = doc(myDB, 'userSaves/users')
      const recipe: DocumentReference = doc(myDB, "userSaves", "users", uid, this.requestedRecipeData[6])
      setDoc(recipe, {category: this.requestedRecipeData[0], description: this.requestedRecipeData[1], feeds: this.requestedRecipeData[2],
        id: this.requestedRecipeData[3], ingredients: this.requestedRecipeData[4], instructions: this.requestedRecipeData[5],
        name: this.requestedRecipeData[6], picture: this.requestedRecipeData[7], prepTime: this.requestedRecipeData[8]})
    }
  }

  auth: Auth | null = null;

  mounted(): void {
    this.auth = getAuth();

    //retrieve the recipe from the database
    
    let recipes:CollectionReference
    recipes = collection(myDB, 'recipes')
    var requestedRecipeReference = doc( myDB, 'recipes', this.singularRecipeID )
    var requestedRecipe = getDoc(requestedRecipeReference).then((results) => {
      this.requestedRecipeData.push(results.data()?.category)
      this.requestedRecipeData.push(results.data()?.description)
      this.requestedRecipeData.push(results.data()?.feeds)
      this.requestedRecipeData.push(results.data()?.id)
      this.requestedRecipeData.push(results.data()?.ingredients)
      this.requestedRecipeData.push(results.data()?.instructions)
      this.requestedRecipeData.push(results.data()?.name)
      this.requestedRecipeData.push(results.data()?.picture)
      this.requestedRecipeData.push(results.data()?.prepTime)
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
      */
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
  background-color: #333;
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 5000;
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

#meta {
  margin-top: auto;
  flex: 0 1 auto;
  position: relative;
  left: 50%;
  transform: translateX(-100%);
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

</style>
