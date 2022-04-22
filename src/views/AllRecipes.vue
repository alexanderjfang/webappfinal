<template>
  <div class="home">
    <h1>Welcome to All Recipes Page</h1>
    <button @click="homepage">Home Page</button>
    <button @click="login">Login Page</button>
    <button @click="allrecipes">All Recipes Page</button>
    <button @click="favorites">Favorite Recipes Page</button>
    <!-- Below is the table full of recipes -->
    <table>
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Category</th>
        <th>Feeds</th>
        <th>Prep Time</th>
      </tr>
      <tr v-for="(u,pos) in recipeArray" :key="pos">
            <td><img :src="u.picture" style="height:250px"></td>
            <td>{{u.name}}</td>
            <td>{{u.category}}</td>
            <td>{{u.feeds}}</td>
            <td>{{u.prepTime}}</td>
        </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {FirebaseApp, initializeApp} from 'firebase/app';
import {getFirestore, QueryDocumentSnapshot, Firestore, getDocs, collection, DocumentReference, doc, CollectionReference, setDoc, QuerySnapshot, deleteDoc, DocumentData} from 'firebase/firestore';
import { firebaseConfig } from "@/myconfig";
import {
  getAuth, User,
} from "firebase/auth";

const myApp:FirebaseApp = initializeApp(firebaseConfig);
const myDB:Firestore = getFirestore(myApp);

@Component
export default class Homepage extends Vue {
  //create array for storing the recipes
  recipeArray: DocumentData[] = []
  
  homepage(): void{
    this.$router.replace({path: '/'})
  }
  login(): void{
    this.$router.push({path: '/login'})
  }
  allrecipes(): void{
    //already on this page
  }
  favorites(): void{
    this.$router.push({path: '/favorites'})
  }
  mounted(): void {
    //implementing database parsing to reveal all recipes

    //get collection reference and add recipes to the array
    let recipes:CollectionReference
    recipes = collection(myDB, 'recipes')
    getDocs(recipes).then((qs: QuerySnapshot) => {
      qs.forEach((qd: QueryDocumentSnapshot) => {
        this.recipeArray.push(qd.data())
      });
    });

    //delete
    console.log(this.recipeArray)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
