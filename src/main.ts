import Vue from 'vue'
import App from './App.vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Homepage from './views/Homepage.vue'
import Login from './views/Login.vue'
import RandomRecipe from './views/RandomRecipe.vue'
import Favorites from './views/Favorites.vue'

Vue.use(VueRouter)

const myRouteArr: Array<RouteConfig> = [
  {name:"le Home Page", path: "/", component: Homepage},
  {name:"le Login Page", path: "/login", component: Login},
  {name:"le Recipe Page", path: "/randomrecipe", component: RandomRecipe},
  {name:"le Favorites Page", path: "/favorites", component: Favorites}
]

const myRouter = new VueRouter({routes: myRouteArr})
new Vue({
  router: myRouter,

  render: h => h(App),
}).$mount('#app')
