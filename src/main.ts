import Vue from 'vue'
import App from './App.vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Homepage from './views/Homepage.vue'
import Login from './views/Login.vue'
import AllRecipes from './views/AllRecipes.vue'
import Favorites from './views/Favorites.vue'
import SingularRecipe from './views/SingularRecipe.vue'
import AboutUs from './views/AboutUs.vue'
import ContactUs from './views/ContactUs.vue'
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./myconfig";
Vue.config.productionTip = false;

Vue.use(VueRouter)

const myRouteArr: Array<RouteConfig> = [
  {name:"le Home Page", path: "/", component: Homepage},
  {name:"le Login Page", path: "/login", component: Login},
  {name:"le All Recipes Page", path: "/allrecipes", component: AllRecipes},
  {name:"le Favorites Page", path: "/favorites", component: Favorites},
  {name:"le Singular Recipe Page", path: "/singular/:singularRecipeID", component: SingularRecipe, props: true},
  {name:"le About Us Page", path: "/aboutUs", component: AboutUs},
  {name:"le Contact Us", path: "/contactUs", component: ContactUs}
]

const myRouter = new VueRouter({routes: myRouteArr})
const app = initializeApp(firebaseConfig);

new Vue({
  router: myRouter,

  render: h => h(App),
}).$mount('#app')